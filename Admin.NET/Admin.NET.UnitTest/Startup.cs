using Admin.NET.Core;
using Furion;
using Microsoft.Extensions.DependencyInjection;
using Xunit;
using Xunit.Abstractions;
using Xunit.Sdk;

// �������������ͣ���һ�������� Startup �������޶������ڶ��������ǵ�ǰ��Ŀ��������
[assembly: TestFramework("Admin.NET.UnitTest.Startup", "Admin.NET.UnitTest")]

namespace Admin.NET.UnitTest
{
    /// <summary>
    /// ��Ԫ����������
    /// </summary>
    /// <remarks>���������ʹ�� Furion �������й���</remarks>
    public sealed class Startup : XunitTestFramework
    {
        public Startup(IMessageSink messageSink) : base(messageSink)
        {
            // ��ʼ�� IServiceCollection ����
            var services = Inject.Create();

            // ��������Ժ� .NET Core һ��ע������ˣ�����

            services.AddScoped<IUserManager, TestUserManager>();

            // ���� ServiceProvider ����
            services.Build();
        }
    }
}