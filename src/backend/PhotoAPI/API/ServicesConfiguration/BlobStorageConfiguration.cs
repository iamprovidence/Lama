using Domains.Settings;

using DataAccess.Interfaces;
using DataAccess.Implementations;

using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Options;

namespace API.ServicesConfiguration
{
    internal static class BlobStorageConfiguration
    {
        public static void AddBlobStorage(this IServiceCollection services, IConfiguration configuration)
        {
            services.Configure<BlobStorageSettings>(configuration);

            services.AddScoped<IPhotoBlobStorage>(servicesProvider =>
            {
                BlobStorageSettings settings = servicesProvider.GetRequiredService<IOptions<BlobStorageSettings>>().Value;

                return new PhotoBlobStorage(settings);
            });
        }
    }
}
