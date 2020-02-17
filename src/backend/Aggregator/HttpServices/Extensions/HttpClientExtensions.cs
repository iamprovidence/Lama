using Newtonsoft.Json;

using System.Net.Http;
using System.Threading.Tasks;

namespace HttpServices.Extensions
{
    public static class HttpClientExtensions
    {
        public static async Task<TResponse> GetAsync<TResponse> (this HttpClient httpClient, string url)
        {
            string jsonResponse = await httpClient.GetStringAsync(url);

            return JsonConvert.DeserializeObject<TResponse>(jsonResponse);
        }
    }
}
