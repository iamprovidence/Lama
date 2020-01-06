using Application.Common.Interfaces;

using Infrastructure.Context;
using Infrastructure.Interfaces;
using Infrastructure.Initializers;

using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace API.ServicesConfigurations
{
    internal static class DataBaseConfiguration
    {
        public static void AddDataBaseServices(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddScoped<IDbInitializer, DefaultDbInitializer>();

            services.AddDbContext<ApplicationDbContext>(options =>
            {
                string connectionString = configuration.GetConnectionString("LamaDatabase");
                options.UseSqlServer(connectionString);
            }, ServiceLifetime.Scoped);

            services.AddScoped<IApplicationDbContext>(provider => provider.GetService<ApplicationDbContext>());
        }
    }
}
