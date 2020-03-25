using Domains.DataTransferObjects.Photos;

using HttpServices.Extensions;
using HttpServices.Interfaces;

using Microsoft.Extensions.Caching.Distributed;

using System;
using System.IO;
using System.Threading.Tasks;
using System.Collections.Generic;

namespace HttpServices.CacheDecorators
{
	public class PhotosCacheService : IPhotosService
	{
		private readonly IPhotosService _photosService;
		private readonly IDistributedCache _cache;

		public PhotosCacheService(IPhotosService photosService, IDistributedCache distributedCache)
		{
			_photosService = photosService;
			_cache = distributedCache;
		}

		public async Task<IEnumerable<PhotoListDTO>> GetAllPhotosAsync()
		{
			string cacheKey = "all_photos";

			if (!_cache.Has(cacheKey))
			{
				IEnumerable<PhotoListDTO> photoList = await _photosService.GetAllPhotosAsync();

				int expireTimeInMinutues = 5;
				DistributedCacheEntryOptions options = new DistributedCacheEntryOptions().SetAbsoluteExpiration(TimeSpan.FromMinutes(expireTimeInMinutues));

				await _cache.SetAsync(cacheKey, photoList, options);
			}

			return await _cache.GetAsync<IEnumerable<PhotoListDTO>>(cacheKey);
		}

		#region Not Cached
		public Task<Stream> DownloadPhotosAsync(IEnumerable<Guid> photosToDownloadIds)
		{
			return _photosService.DownloadPhotosAsync(photosToDownloadIds);
		}

		public Task<IEnumerable<PhotoListDTO>> GetCurrentUserPhotosAsync()
		{
			return _photosService.GetCurrentUserPhotosAsync();
		}
		#endregion
	}
}
