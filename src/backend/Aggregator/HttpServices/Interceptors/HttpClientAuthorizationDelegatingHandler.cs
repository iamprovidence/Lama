using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Authentication;

using System.Net.Http;
using System.Net.Http.Headers;

using System.Collections.Generic;

using System.Threading;
using System.Threading.Tasks;

namespace HttpServices.Interceptors
{
    public class HttpClientAuthorizationDelegatingHandler : DelegatingHandler
    {
        private readonly IHttpContextAccessor _httpContextAccesor;

        public HttpClientAuthorizationDelegatingHandler(IHttpContextAccessor httpContextAccesor)
        {
            _httpContextAccesor = httpContextAccesor;
        }

        protected override async Task<HttpResponseMessage> SendAsync(HttpRequestMessage request, CancellationToken cancellationToken)
        {
            string authorizationHeader = _httpContextAccesor
                .HttpContext
                .Request
                .Headers["Authorization"];

            if (!string.IsNullOrEmpty(authorizationHeader))
            {
                request.Headers.Add("Authorization", new List<string>() { authorizationHeader });
            }

            string token = await GetToken();

            if (token != null)
            {
                request.Headers.Authorization = new AuthenticationHeaderValue("Bearer", token);
            }

            return await base.SendAsync(request, cancellationToken);
        }

        private Task<string> GetToken()
        {
            const string ACCESS_TOKEN = "access_token";

            return _httpContextAccesor.HttpContext.GetTokenAsync(ACCESS_TOKEN);
        }
    }
}
