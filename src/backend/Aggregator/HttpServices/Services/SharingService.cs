using System.Threading.Tasks;
using System.Collections.Generic;

using System.Net.Http;

using HttpServices.Extensions;
using HttpServices.Configuration;

using Microsoft.Extensions.Options;

using Domains.DataTransferObjects.Sharing;

namespace HttpServices.Services
{
	public class SharingService : Interfaces.ISharingService
	{
		private readonly HttpClient _httpClient;
		private readonly UrlsConfiguration _urls;

		public SharingService(HttpClient httpClient, IOptions<UrlsConfiguration> config)
		{
			_httpClient = httpClient;
			_urls = config.Value;
		}

		public Task<IEnumerable<SharedPhotosDTO>> GetSharedWithUserPhotosAsync()
		{
			string url = _urls.Sharing + UrlsConfiguration.SharingUri.GetSharedWithUserPhotosAsync();

			return _httpClient.GetAsync<IEnumerable<SharedPhotosDTO>>(url);
		}
	}
}
