using Domains.Settings;

using DataAccess.Interfaces;
using DataAccess.Implementations;

using Microsoft.Extensions.Options;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace API.ServicesConfiguration
{
	internal static class BlobStorageConfiguration
	{
		public static void AddBlobStorage(this IServiceCollection services, IConfiguration configuration)
		{
			services.AddScoped<IImageService, ImageService>();

			services.Configure<BlobStorageSettings>(configuration.GetSection("BlobStorage"));

			services.AddScoped<IPhotoBlobStorage>(servicesProvider =>
			{
				BlobStorageSettings settings = servicesProvider.GetRequiredService<IOptions<BlobStorageSettings>>().Value;

				return new PhotoBlobStorage(settings);
			});
		}
	}
}
