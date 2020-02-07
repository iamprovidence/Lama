using AutoMapper;
using Microsoft.Extensions.DependencyInjection;

namespace API.ServicesConfigurations
{
    internal static class MapperConfiguration
    {
        public static void AddMapper(this IServiceCollection services)
        {
            services.AddAutoMapper(typeof(Application.Common.Interfaces.IApplicationDbContext).Assembly);
        }
    }
}
