using AutoMapper;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Aggregator.ServicesConfiguration
{
    internal static class MapperConfiguration
    {
        public static void AddMapper(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddAutoMapper(typeof(Domains.MappingProfiles.AlbumsProfile).Assembly);
        }
    }
}
