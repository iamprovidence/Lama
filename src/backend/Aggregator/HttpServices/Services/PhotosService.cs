using System;
using System.Text;
using System.Net.Http;
using System.Threading.Tasks;
using System.Collections.Generic;

using Domains.DataTransferObjects.Photos;

using Microsoft.Extensions.Options;

using HttpServices.Extensions;
using HttpServices.Configuration;

using Newtonsoft.Json;

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

		public async Task<System.IO.Stream> DownloadPhotosAsync(IEnumerable<Guid> photosToDownloadIds)
		{
			string url = _urls.Photos + UrlsConfiguration.PhotosUri.DownloadPhotos();

			string contentJson = JsonConvert.SerializeObject(photosToDownloadIds);
			HttpContent content = new StringContent(contentJson, Encoding.UTF8, "application/json");
			HttpResponseMessage response = await _httpClient.PostAsync(url, content);

			return await response.Content.ReadAsStreamAsync();
		}
	}
}
