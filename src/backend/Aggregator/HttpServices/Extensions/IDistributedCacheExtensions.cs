using Microsoft.Extensions.Caching.Distributed;
using Newtonsoft.Json;
using System.Threading.Tasks;

namespace HttpServices.Extensions
{
	public static class IDistributedCacheExtensions
	{
		public static bool Has(this IDistributedCache cache, string key)
		{
			return cache.Get(key) != null;
		}

		public static Task SetAsync<T>(this IDistributedCache cache, string key, T value, DistributedCacheEntryOptions options)
		{
			string valueJson = JsonConvert.SerializeObject(value);
			return cache.SetStringAsync(key, valueJson, options);
		}

		public static async Task<T> GetAsync<T>(this IDistributedCache cache, string key)
		{
			string valueJson = await cache.GetStringAsync(key);
			return JsonConvert.DeserializeObject<T>(valueJson);
		}
	}
}
