using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

using HttpServices.Services;
using HttpServices.Interfaces;
using HttpServices.Interceptors;
using HttpServices.Configuration;

namespace Aggregator.ServicesConfiguration
{
	internal static class HttpServicesConfiguration
	{
		public static void AddHttpServices(this IServiceCollection services, IConfiguration configuration)
		{
			services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();
			services.AddTransient<HttpClientAuthorizationDelegatingHandler>();

			services.Configure<UrlsConfiguration>(configuration.GetSection("urls"));

			services
				.AddHttpClient<IPhotosService, PhotosService>()
				.AddHttpMessageHandler<HttpClientAuthorizationDelegatingHandler>();

			services
				.AddHttpClient<IAlbumsService, AlbumsService>()
				.AddHttpMessageHandler<HttpClientAuthorizationDelegatingHandler>();

			services
				.AddHttpClient<ISharingService, SharingService>()
				.AddHttpMessageHandler<HttpClientAuthorizationDelegatingHandler>();
		}
	}
}
