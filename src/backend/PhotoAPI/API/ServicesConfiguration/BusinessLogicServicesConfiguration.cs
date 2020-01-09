using BusinessLogic.Interfaces;
using BusinessLogic.Services;

using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace API.ServicesConfiguration
{
    internal static class BusinessLogicServicesConfiguration
    {
        public static void AddBussinessLogicServices(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddScoped<IPhotoService, PhotoService>();
        }
    }
}
