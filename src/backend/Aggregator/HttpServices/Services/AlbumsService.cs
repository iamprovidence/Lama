using System.Net.Http;
using System.Threading.Tasks;
using System.Collections.Generic;

using Domains.DataTransferObjects.Albums;

using Microsoft.Extensions.Options;

using HttpServices.Extensions;
using HttpServices.Configuration;

namespace HttpServices.Services
{
	public class AlbumsService : Interfaces.IAlbumsService
	{
		private readonly HttpClient _httpClient;
		private readonly UrlsConfiguration _urls;

		public AlbumsService(HttpClient httpClient, IOptions<UrlsConfiguration> config)
		{
			_httpClient = httpClient;
			_urls = config.Value;
		}

		public Task<IEnumerable<AlbumListDTO>> GetCurrentUserAlbumsAsync()
		{
			string url = _urls.Albums + UrlsConfiguration.AlbumsUri.GetCurrentUserAlbums();

			return _httpClient.GetAsync<IEnumerable<AlbumListDTO>>(url);
		}

		public Task<IEnumerable<PhotoAlbumDTO>> GetAlbumPhotos(int albumId)
		{
			string url = _urls.Albums + UrlsConfiguration.AlbumsUri.GetAlbumPhotos(albumId);

			return _httpClient.GetAsync<IEnumerable<PhotoAlbumDTO>>(url);
		}
	}
}
