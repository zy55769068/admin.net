﻿using Admin.NET.Core;
using AspNetCoreRateLimit;
using Furion;
using Furion.Logging;
using Furion.SpecificationDocument;
using IGeekFan.AspNetCore.Knife4jUI;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpOverrides;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using NETCore.MailKit.Extensions;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using OnceMi.AspNetCore.OSS;
using System;
using System.IO;
using Yitter.IdGenerator;

namespace Admin.NET.Web.Core;

public class Startup : AppStartup
{
    public void ConfigureServices(IServiceCollection services)
    {
        // 配置选项
        services.AddProjectOptions();
        // SqlSugar
        services.AddSqlSugar();
        // JWT
        services.AddJwt<JwtHandler>(enableGlobalAuthorize: true);
        // 允许跨域
        services.AddCorsAccessor();
        // 远程请求
        services.AddRemoteRequest();
        // 任务调度
        services.AddTaskScheduler();
        // 脱敏检测
        services.AddSensitiveDetection();
        // 结果拦截器
        services.AddMvcFilter<ResultFilter>();
        // 日志监听
        services.AddMonitorLogging();
        // 第三方授权登录
        services.AddAuthentication()
            .AddWeixin(options =>
            {
                var opt = App.GetOptions<OAuthOptions>();
                options.ClientId = opt.Weixin.ClientId;
                options.ClientSecret = opt.Weixin.ClientSecret;
            });
        // ElasticSearch
        services.AddElasticSearch();

        services.AddControllersWithViews()
            .AddAppLocalization()
            .AddNewtonsoftJson(options =>
            {
                options.SerializerSettings.ContractResolver = new CamelCasePropertyNamesContractResolver(); // 响应驼峰命名
                options.SerializerSettings.DateFormatString = "yyyy-MM-dd HH:mm:ss"; // 时间格式化
                options.SerializerSettings.ReferenceLoopHandling = ReferenceLoopHandling.Ignore; // 忽略循环引用
                // options.SerializerSettings.NullValueHandling = NullValueHandling.Ignore; // 忽略空值
            })
            .AddInjectWithUnifyResult<AdminResultProvider>();

        // 配置Nginx转发获取客户端真实IP
        // 注1：如果负载均衡不是在本机通过 Loopback 地址转发请求的，一定要加上options.KnownNetworks.Clear()和options.KnownProxies.Clear()
        // 注2：如果设置环境变量 ASPNETCORE_FORWARDEDHEADERS_ENABLED 为 True，则不需要下面的配置代码
        services.Configure<ForwardedHeadersOptions>(options =>
        {
            options.ForwardedHeaders = ForwardedHeaders.All;
            options.KnownNetworks.Clear();
            options.KnownProxies.Clear();
        });

        // 限流服务
        services.AddInMemoryRateLimiting();
        services.AddSingleton<IRateLimitConfiguration, RateLimitConfiguration>();

        // 事件总线
        services.AddEventBus(builder =>
        {
            // 订阅日志事件
            builder.AddSubscriber<LogEventSubscriber>();
            // 事件执行器（失败重试）
            builder.AddExecutor<RetryEventHandlerExecutor>();
        });

        // OSS对象存储（必须一个个赋值）
        var opt = App.GetOptions<OSSProviderOptions>();
        services.AddOSSService(opt.ProviderName, options =>
        {
            options.Provider = opt.Provider;
            options.Endpoint = opt.Endpoint;
            options.AccessKey = opt.AccessKey;
            options.SecretKey = opt.SecretKey;
            options.Region = opt.Region;
            options.IsEnableCache = opt.IsEnableCache;
            options.IsEnableHttps = opt.IsEnableHttps;
        });

        // 电子邮件
        services.AddMailKit(options =>
        {
            options.UseMailKit(App.GetOptions<EmailOptions>());
        });

        // Redis缓存
        services.AddCSRedisSetup();

        // 模板引擎
        services.AddViewEngine();

        // 即时通讯
        services.AddSignalR();

        // logo显示
        services.AddLogoDisplay();

        // 日志写入文件-消息、警告、错误
        Array.ForEach(new[] { LogLevel.Information, LogLevel.Warning, LogLevel.Error }, logLevel =>
        {
            services.AddFileLogging("logs/{0:yyyyMMdd}_{1}.log", options =>
            {
                options.FileNameRule = fileName => string.Format(fileName, DateTime.Now, logLevel.ToString()); // 每天创建一个文件
                options.WriteFilter = logMsg => logMsg.LogLevel == logLevel; // 日志级别
                options.FileSizeLimitBytes = 10 * 1024 * 1024; // 每个文件10M
                options.MaxRollingFiles = 30; // 只保留30个文件
                // 输出Json格式，对接阿里云日志、Elastaicsearch第三方日志
                options.MessageFormat = (logMsg) =>
                {
                    return logMsg.WriteArray(writer =>
                    {
                        writer.WriteStringValue(DateTime.Now.ToString("o"));
                        writer.WriteStringValue(logMsg.LogLevel.ToString());
                        writer.WriteStringValue(logMsg.LogName);
                        writer.WriteNumberValue(logMsg.EventId.Id);
                        writer.WriteStringValue(logMsg.Message);
                        writer.WriteStringValue(logMsg.Exception?.ToString());
                    });
                };
                // 写入失败时启用备用文件
                options.HandleWriteError = (writeError) =>
                {
                    writeError.UseRollbackFileName(Path.GetFileNameWithoutExtension(writeError.CurrentFileName) + "-oops" + Path.GetExtension(writeError.CurrentFileName));
                };
            });
        });
        // 日志写入数据库
        services.AddDatabaseLogging<DatabaseLoggingWriter>(options =>
        {
            options.MinimumLevel = LogLevel.Information;
        });
        //// 日志写入ElasticSearch
        //services.AddDatabaseLogging<ESLoggingWriter>(options =>
        //{
        //    options.MinimumLevel = LogLevel.Information;
        //});

        // 设置雪花Id算法机器码
        YitIdHelper.SetIdGenerator(new IdGeneratorOptions
        {
            WorkerId = App.GetOptions<SnowIdOptions>().WorkerId
        });
    }

    public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
    {
        if (env.IsDevelopment())
        {
            app.UseDeveloperExceptionPage();
            app.UseForwardedHeaders();
        }
        else
        {
            app.UseExceptionHandler("/Home/Error");
            app.UseForwardedHeaders();
            app.UseHsts();
        }

        // 添加状态码拦截中间件
        app.UseUnifyResultStatusCodes();

        // 配置多语言
        app.UseAppLocalization();

        // 启用HTTPS
        app.UseHttpsRedirection();
        app.UseStaticFiles();

        app.UseRouting();

        app.UseCorsAccessor();

        // 限流组件（在跨域之后）
        app.UseIpRateLimiting();
        app.UseClientRateLimiting();

        app.UseAuthentication();
        app.UseAuthorization();

        // 配置Swagger-Knife4UI（路由前缀一致代表独立，不同则代表共存）
        app.UseKnife4UI(options =>
        {
            options.RoutePrefix = "kapi";
            foreach (var groupInfo in SpecificationDocumentBuilder.GetOpenApiGroups())
            {
                options.SwaggerEndpoint("/" + groupInfo.RouteTemplate, groupInfo.Title);
            }
        });

        app.UseInject();

        app.UseEndpoints(endpoints =>
        {
            // 注册集线器
            endpoints.MapHubs();

            endpoints.MapControllerRoute(
                name: "default",
                pattern: "{controller=Home}/{action=Index}/{id?}");
        });
    }
}