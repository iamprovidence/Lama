using Application.Common.Interfaces;
using Microsoft.AspNetCore.Http;
using System.Security.Claims;

namespace Infrastructure.Identity
{
	public class AuthService : IAuthService
	{
		private readonly IHttpContextAccessor _httpContextAccessor;

		public AuthService(IHttpContextAccessor httpContextAccessor)
		{
			_httpContextAccessor = httpContextAccessor;
		}

		public string GetCurrentUserEmail()
		{
			return _httpContextAccessor.HttpContext.User.FindFirst(ClaimTypes.Email).Value;
		}

		public string GetCurrentUserId()
		{
			return _httpContextAccessor.HttpContext.User.FindFirst(ClaimTypes.NameIdentifier).Value;
		}
	}
}
