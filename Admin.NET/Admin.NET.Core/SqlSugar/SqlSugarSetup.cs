// 麻省理工学院许可证
//
// 版权所有 (c) 2021-2023 zuohuaijun，大名科技（天津）有限公司  联系电话/微信：18020030720  QQ：515096995
//
// 特此免费授予获得本软件的任何人以处理本软件的权利，但须遵守以下条件：在所有副本或重要部分的软件中必须包括上述版权声明和本许可声明。
//
// 软件按“原样”提供，不提供任何形式的明示或暗示的保证，包括但不限于对适销性、适用性和非侵权的保证。
// 在任何情况下，作者或版权持有人均不对任何索赔、损害或其他责任负责，无论是因合同、侵权或其他方式引起的，与软件或其使用或其他交易有关。

namespace Admin.NET.Core;

public static class SqlSugarSetup
{
    /// <summary>
    /// SqlSugar 上下文初始化
    /// </summary>
    /// <param name="services"></param>
    public static void AddSqlSugar(this IServiceCollection services)
    {
        // 自定义 SqlSugar 雪花ID算法
        SnowFlakeSingle.WorkId = App.GetOptions<SnowIdOptions>().WorkerId;
        StaticConfig.CustomSnowFlakeFunc = () =>
        {
            return YitIdHelper.NextId();
        };

        var dbOptions = App.GetOptions<DbConnectionOptions>();
        dbOptions.ConnectionConfigs.ForEach(SetDbConfig);

        SqlSugarScope sqlSugar = new(dbOptions.ConnectionConfigs.Adapt<List<ConnectionConfig>>(), db =>
        {
            dbOptions.ConnectionConfigs.ForEach(config =>
            {
                var dbProvider = db.GetConnectionScope(config.ConfigId);
                SetDbAop(dbProvider);
                SetDbDiffLog(dbProvider, config);
            });
        });

        services.AddSingleton<ISqlSugarClient>(sqlSugar); // 单例注册
        services.AddScoped(typeof(SqlSugarRepository<>)); // 仓储注册
        services.AddUnitOfWork<SqlSugarUnitOfWork>(); // 事务与工作单元注册

        // 初始化数据库表结构及种子数据
        dbOptions.ConnectionConfigs.ForEach(config =>
        {
            InitDatabase(sqlSugar, config);
        });
    }

    /// <summary>
    /// 配置连接属性
    /// </summary>
    /// <param name="config"></param>
    public static void SetDbConfig(DbConnectionConfig config)
    {
        var configureExternalServices = new ConfigureExternalServices
        {
            EntityNameService = (type, entity) => // 处理表
            {
                // 只处理贴了特性 SugarTable 表
                if (!type.GetCustomAttributes<SugarTable>().Any())
                    return;
                if (config.EnableUnderLine && !entity.DbTableName.Contains('_'))
                    entity.DbTableName = UtilMethods.ToUnderLine(entity.DbTableName); // 驼峰转下划线
            },
            EntityService = (type, column) => // 处理列
            {
                // 只处理贴了特性 SugarColumn 列
                if (!type.GetCustomAttributes<SugarColumn>().Any())
                    return;
                if (new NullabilityInfoContext().Create(type).WriteState is NullabilityState.Nullable)
                    column.IsNullable = true;
                if (config.EnableUnderLine && !column.IsIgnore && !column.DbColumnName.Contains('_'))
                    column.DbColumnName = UtilMethods.ToUnderLine(column.DbColumnName); // 驼峰转下划线

                if (config.DbType == SqlSugar.DbType.Oracle)
                {
                    if (type.PropertyType == typeof(long) || type.PropertyType == typeof(long?))
                        column.DataType = "number(18)";
                    if (type.PropertyType == typeof(bool) || type.PropertyType == typeof(bool?))
                        column.DataType = "number(1)";
                }
            },
            DataInfoCacheService = new SqlSugarCache(),
        };
        config.ConfigureExternalServices = configureExternalServices;
        config.InitKeyType = InitKeyType.Attribute;
        config.IsAutoCloseConnection = true;
        config.MoreSettings = new ConnMoreSettings
        {
            IsAutoRemoveDataCache = true,
            IsAutoDeleteQueryFilter = true, // 启用删除查询过滤器
            IsAutoUpdateQueryFilter = true, // 启用更新查询过滤器
            SqlServerCodeFirstNvarchar = true // 采用Nvarchar
        };
    }

    /// <summary>
    /// 配置Aop
    /// </summary>
    /// <param name="db"></param>
    public static void SetDbAop(SqlSugarScopeProvider db)
    {
        var config = db.CurrentConnectionConfig;

        // 设置超时时间
        db.Ado.CommandTimeOut = 30;

        // 打印SQL语句
        db.Aop.OnLogExecuting = (sql, pars) =>
        {
            var originColor = Console.ForegroundColor;
            if (sql.StartsWith("SELECT", StringComparison.OrdinalIgnoreCase))
                Console.ForegroundColor = ConsoleColor.Green;
            if (sql.StartsWith("UPDATE", StringComparison.OrdinalIgnoreCase) || sql.StartsWith("INSERT", StringComparison.OrdinalIgnoreCase))
                Console.ForegroundColor = ConsoleColor.Yellow;
            if (sql.StartsWith("DELETE", StringComparison.OrdinalIgnoreCase))
                Console.ForegroundColor = ConsoleColor.Red;
            Console.WriteLine("【" + DateTime.Now + "——执行SQL】\r\n" + UtilMethods.GetSqlString(config.DbType, sql, pars) + "\r\n");
            Console.ForegroundColor = originColor;
            App.PrintToMiniProfiler("SqlSugar", "Info", sql + "\r\n" + db.Utilities.SerializeObject(pars.ToDictionary(it => it.ParameterName, it => it.Value)));
        };
        db.Aop.OnError = ex =>
        {
            if (ex.Parametres == null) return;
            var originColor = Console.ForegroundColor;
            Console.ForegroundColor = ConsoleColor.DarkRed;
            var pars = db.Utilities.SerializeObject(((SugarParameter[])ex.Parametres).ToDictionary(it => it.ParameterName, it => it.Value));
            Console.WriteLine("【" + DateTime.Now + "——错误SQL】\r\n" + UtilMethods.GetSqlString(config.DbType, ex.Sql, (SugarParameter[])ex.Parametres) + "\r\n");
            Console.ForegroundColor = originColor;
            App.PrintToMiniProfiler("SqlSugar", "Error", $"{ex.Message}{Environment.NewLine}{ex.Sql}{pars}{Environment.NewLine}");
        };

        // 数据审计
        db.Aop.DataExecuting = (oldValue, entityInfo) =>
        {
            // 演示环境判断
            if (entityInfo.EntityColumnInfo.IsPrimarykey)
            {
                if (entityInfo.EntityName != nameof(SysJobDetail) && entityInfo.EntityName != nameof(SysJobTrigger) &&
                    entityInfo.EntityName != nameof(SysLogOp) && entityInfo.EntityName != nameof(SysLogVis) &&
                    entityInfo.EntityName != nameof(SysOnlineUser))
                {
                    var isDemoEnv = App.GetService<SysConfigService>().GetConfigValue<bool>(CommonConst.SysDemoEnv).GetAwaiter().GetResult();
                    if (isDemoEnv)
                        throw Oops.Oh(ErrorCodeEnum.D1200);
                }
            }

            if (entityInfo.OperationType == DataFilterType.InsertByObject)
            {
                // 主键(long类型)且没有值的---赋值雪花Id
                if (entityInfo.EntityColumnInfo.IsPrimarykey && entityInfo.EntityColumnInfo.PropertyInfo.PropertyType == typeof(long))
                {
                    var id = entityInfo.EntityColumnInfo.PropertyInfo.GetValue(entityInfo.EntityValue);
                    if (id == null || (long)id == 0)
                        entityInfo.SetValue(YitIdHelper.NextId());
                }
                if (entityInfo.PropertyName == "CreateTime")
                    entityInfo.SetValue(DateTime.Now);
                if (App.User != null)
                {
                    if (entityInfo.PropertyName == "TenantId")
                    {
                        var tenantId = ((dynamic)entityInfo.EntityValue).TenantId;
                        if (tenantId == null || tenantId == 0)
                            entityInfo.SetValue(App.User.FindFirst(ClaimConst.TenantId)?.Value);
                    }
                    if (entityInfo.PropertyName == "CreateUserId")
                    {
                        var createUserId = ((dynamic)entityInfo.EntityValue).CreateUserId;
                        if (createUserId == 0 || createUserId == null)
                            entityInfo.SetValue(App.User.FindFirst(ClaimConst.UserId)?.Value);
                    }

                    if (entityInfo.PropertyName == "CreateOrgId")
                    {
                        var createOrgId = ((dynamic)entityInfo.EntityValue).CreateOrgId;
                        if (createOrgId == 0 || createOrgId == null)
                            entityInfo.SetValue(App.User.FindFirst(ClaimConst.OrgId)?.Value);
                    }
                }
            }
            if (entityInfo.OperationType == DataFilterType.UpdateByObject)
            {
                if (entityInfo.PropertyName == "UpdateTime")
                    entityInfo.SetValue(DateTime.Now);
                if (entityInfo.PropertyName == "UpdateUserId")
                    entityInfo.SetValue(App.User?.FindFirst(ClaimConst.UserId)?.Value);
            }
        };

        // 超管时排除各种过滤器
        if (App.User?.FindFirst(ClaimConst.AccountType)?.Value == ((int)AccountTypeEnum.SuperAdmin).ToString())
            return;

        // 配置实体假删除过滤器
        db.QueryFilter.AddTableFilter<IDeletedFilter>(u => u.IsDelete == false);
        // 配置租户过滤器
        var tenantId = App.User?.FindFirst(ClaimConst.TenantId)?.Value;
        if (!string.IsNullOrWhiteSpace(tenantId))
            db.QueryFilter.AddTableFilter<ITenantIdFilter>(u => u.TenantId == long.Parse(tenantId));

        // 配置用户机构（数据范围）过滤器
        SqlSugarFilter.SetOrgEntityFilter(db);
        // 配置自定义过滤器
        SqlSugarFilter.SetCustomEntityFilter(db);
    }

    /// <summary>
    /// 开启库表差异化日志
    /// </summary>
    /// <param name="db"></param>
    /// <param name="config"></param>
    private static void SetDbDiffLog(SqlSugarScopeProvider db, DbConnectionConfig config)
    {
        if (!config.EnableDiffLog) return;

        db.Aop.OnDiffLogEvent = async u =>
        {
            var logDiff = new SysLogDiff
            {
                // 操作后记录（字段描述、列名、值、表名、表描述）
                AfterData = JSON.Serialize(u.AfterData),
                // 操作前记录（字段描述、列名、值、表名、表描述）
                BeforeData = JSON.Serialize(u.BeforeData),
                // 传进来的对象
                BusinessData = JSON.Serialize(u.BusinessData),
                // 枚举（insert、update、delete）
                DiffType = u.DiffType.ToString(),
                Sql = UtilMethods.GetSqlString(config.DbType, u.Sql, u.Parameters),
                Parameters = JSON.Serialize(u.Parameters),
                Elapsed = u.Time == null ? 0 : (long)u.Time.Value.TotalMilliseconds
            };
            await db.Insertable(logDiff).ExecuteCommandAsync();
            Console.ForegroundColor = ConsoleColor.Red;
            Console.WriteLine(DateTime.Now + $"\r\n*****差异日志开始*****\r\n{Environment.NewLine}{JSON.Serialize(logDiff)}{Environment.NewLine}*****差异日志结束*****\r\n");
        };
    }

    /// <summary>
    /// 初始化数据库
    /// </summary>
    /// <param name="db"></param>
    /// <param name="config"></param>
    private static void InitDatabase(SqlSugarScope db, DbConnectionConfig config)
    {
        if (!config.EnableInitDb) return;

        SqlSugarScopeProvider dbProvider = db.GetConnectionScope(config.ConfigId);

        // 创建数据库
        if (config.DbType != SqlSugar.DbType.Oracle)
            dbProvider.DbMaintenance.CreateDatabase();

        // 获取所有实体表-初始化表结构
        var entityTypes = App.EffectiveTypes.Where(u => !u.IsInterface && !u.IsAbstract && u.IsClass && u.IsDefined(typeof(SugarTable), false)).ToList();
        if (!entityTypes.Any()) return;
        foreach (var entityType in entityTypes)
        {
            var tAtt = entityType.GetCustomAttribute<TenantAttribute>();
            if (tAtt != null && tAtt.configId.ToString() != config.ConfigId) continue;
            if (tAtt == null && config.ConfigId != SqlSugarConst.ConfigId) continue;

            var splitTable = entityType.GetCustomAttribute<SplitTableAttribute>();
            if (splitTable == null)
                dbProvider.CodeFirst.InitTables(entityType);
            else
                dbProvider.CodeFirst.SplitTables().InitTables(entityType);
        }

        if (!config.EnableInitSeed) return;

        // 获取所有种子配置-初始化数据
        var seedDataTypes = App.EffectiveTypes.Where(u => !u.IsInterface && !u.IsAbstract && u.IsClass
            && u.GetInterfaces().Any(i => i.HasImplementedRawGeneric(typeof(ISqlSugarEntitySeedData<>)))).ToList();
        if (!seedDataTypes.Any()) return;
        foreach (var seedType in seedDataTypes)
        {
            var instance = Activator.CreateInstance(seedType);

            var hasDataMethod = seedType.GetMethod("HasData");
            var seedData = ((IEnumerable)hasDataMethod?.Invoke(instance, null))?.Cast<object>();
            if (seedData == null) continue;

            var entityType = seedType.GetInterfaces().First().GetGenericArguments().First();
            var tAtt = entityType.GetCustomAttribute<TenantAttribute>();
            if (tAtt != null && tAtt.configId.ToString() != config.ConfigId) continue;
            if (tAtt == null && config.ConfigId != SqlSugarConst.ConfigId) continue;

            var entityInfo = dbProvider.EntityMaintenance.GetEntityInfo(entityType);
            if (entityInfo.Columns.Any(u => u.IsPrimarykey))
            {
                // 按主键进行批量增加和更新
                var storage = dbProvider.StorageableByObject(seedData.ToList()).ToStorage();
                storage.AsInsertable.ExecuteCommand();
                var ignoreUpdate = hasDataMethod.GetCustomAttribute<IgnoreUpdateAttribute>();
                if (ignoreUpdate == null) storage.AsUpdateable.ExecuteCommand();
            }
            else
            {
                // 无主键则只进行插入
                if (!dbProvider.Queryable(entityInfo.DbTableName, entityInfo.DbTableName).Any())
                    dbProvider.InsertableByObject(seedData.ToList()).ExecuteCommand();
            }
        }
    }

    /// <summary>
    /// 初始化租户业务数据库
    /// </summary>
    /// <param name="iTenant"></param>
    /// <param name="config"></param>
    public static void InitTenantDatabase(ITenant iTenant, DbConnectionConfig config)
    {
        SetDbConfig(config);

        iTenant.AddConnection(config);
        var db = iTenant.GetConnectionScope(config.ConfigId);
        db.DbMaintenance.CreateDatabase();

        // 获取所有实体表-初始化租户业务表
        var entityTypes = App.EffectiveTypes.Where(u => !u.IsInterface && !u.IsAbstract && u.IsClass
            && u.IsDefined(typeof(SugarTable), false) && !u.IsDefined(typeof(SystemTableAttribute), false)).ToList();
        if (!entityTypes.Any()) return;
        foreach (var entityType in entityTypes)
        {
            var splitTable = entityType.GetCustomAttribute<SplitTableAttribute>();
            if (splitTable == null)
                db.CodeFirst.InitTables(entityType);
            else
                db.CodeFirst.SplitTables().InitTables(entityType);
        }
    }
}