using AggregatorServices.Services;
using AggregatorServices.Interfaces;

using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Aggregator.ServicesConfiguration
{
	public static class AggregatorConfiguration
	{
		public static void AddAggregators(this IServiceCollection services, IConfiguration configuration)
		{
			services.AddSingleton<IAlbumAggregator, AlbumAggregator>();
			services.AddSingleton<ISharingAggregator, SharingAggregator>();
		}
	}
}
