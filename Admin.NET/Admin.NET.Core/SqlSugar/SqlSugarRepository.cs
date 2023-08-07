// 麻省理工学院许可证
//
// 版权所有 (c) 2021-2023 zuohuaijun，大名科技（天津）有限公司  联系电话/微信：18020030720  QQ：515096995
//
// 特此免费授予获得本软件的任何人以处理本软件的权利，但须遵守以下条件：在所有副本或重要部分的软件中必须包括上述版权声明和本许可声明。
//
// 软件按“原样”提供，不提供任何形式的明示或暗示的保证，包括但不限于对适销性、适用性和非侵权的保证。
// 在任何情况下，作者或版权持有人均不对任何索赔、损害或其他责任负责，无论是因合同、侵权或其他方式引起的，与软件或其使用或其他交易有关。

namespace Admin.NET.Core;

/// <summary>
/// SqlSugar仓储类
/// </summary>
/// <typeparam name="T"></typeparam>
public class SqlSugarRepository<T> : SimpleClient<T> where T : class, new()
{
    protected ITenant iTenant = null; // 多租户事务

    public SqlSugarRepository(ISqlSugarClient context = null) : base(context)
    {
        iTenant = App.GetRequiredService<ISqlSugarClient>().AsTenant();

        // 若实体贴有多库特性，则返回指定的连接
        if (typeof(T).IsDefined(typeof(TenantAttribute), false))
        {
            base.Context = iTenant.GetConnectionScopeWithAttr<T>();
            return;
        }

        // 若实体贴有系统表特性，则返回默认的连接
        if (typeof(T).IsDefined(typeof(SystemTableAttribute), false))
        {
            base.Context = iTenant.GetConnectionScope(SqlSugarConst.ConfigId);
            return;
        }

        // 若当前未登录或是默认租户Id，则返回默认的连接
        var tenantId = App.GetRequiredService<UserManager>().TenantId;
        if (tenantId < 1 || tenantId.ToString() == SqlSugarConst.ConfigId) return;

        var tenant = App.GetRequiredService<SysCacheService>().Get<List<SysTenant>>(CacheConst.KeyTenant).FirstOrDefault(u => u.Id == tenantId);
        if (tenant is null || tenant is { TenantType: TenantTypeEnum.Id }) return;

        // 根据租户Id切库
        if (!iTenant.IsAnyConnection(tenantId.ToString()))
        {
            // 获取主库连接配置
            var dbOptions = App.GetOptions<DbConnectionOptions>();
            var mainConnConfig = dbOptions.ConnectionConfigs.First(u => u.ConfigId == SqlSugarConst.ConfigId);

            // 连接配置
            var connectionConfig = new DbConnectionConfig
            {
                ConfigId = tenant.Id,
                DbType = tenant.DbType,
                IsAutoCloseConnection = true,
                ConnectionString = tenant.Connection
            };
            iTenant.AddConnection(connectionConfig);
            SqlSugarSetup.SetDbConfig(connectionConfig);
            SqlSugarSetup.SetDbAop(iTenant.GetConnectionScope(tenantId.ToString()));
        }
        base.Context = iTenant.GetConnectionScope(tenantId.ToString());
    }
}