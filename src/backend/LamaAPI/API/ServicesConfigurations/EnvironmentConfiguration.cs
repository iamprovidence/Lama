using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;

namespace API.ServicesConfigurations
{
    public static class EnvironmentConfiguration
    {
        public static IConfiguration BuildConfiguration(IHostingEnvironment hostingEnvironment)
        {
            IConfigurationBuilder builder = new ConfigurationBuilder()
                .SetBasePath(hostingEnvironment.ContentRootPath)
                .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
                .AddEnvironmentVariables();

            return builder.Build();
        }
    }
}
