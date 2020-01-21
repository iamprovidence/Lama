using DataAccess.Interfaces;
using DataAccess.Implementations;

using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace API.ServicesConfiguration
{
    internal static class DataAccessServicesConfiguration
    {
        public static void AddDataAccessServices(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddScoped<IImageService, ImageService>();
        }
    }
}
