using System.Net.Http;
using System.Threading.Tasks;
using System.Collections.Generic;

using Domains.DataTransferObjects.Photos;

using Microsoft.Extensions.Options;

using HttpServices.Extensions;
using HttpServices.Configuration;

namespace HttpServices.Services
{
	public class PhotosService : Interfaces.IPhotosService
	{
		private readonly HttpClient _httpClient;
		private readonly UrlsConfiguration _urls;

		public PhotosService(HttpClient httpClient, IOptions<UrlsConfiguration> config)
		{
			_httpClient = httpClient;
			_urls = config.Value;
		}

		public Task<IEnumerable<PhotoListDTO>> GetAllPhotosAsync()
		{
			string url = _urls.Photos + UrlsConfiguration.PhotosUri.GetAllPhotos();

			return _httpClient.GetAsync<IEnumerable<PhotoListDTO>>(url);
		}

		public Task<IEnumerable<PhotoListDTO>> GetCurrentUserPhotosAsync()
		{
			string url = _urls.Photos + UrlsConfiguration.PhotosUri.GetCurrentUserPhotos();

			return _httpClient.GetAsync<IEnumerable<PhotoListDTO>>(url);
		}
	}
}
