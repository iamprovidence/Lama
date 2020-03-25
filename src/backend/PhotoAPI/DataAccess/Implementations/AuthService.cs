using Microsoft.AspNetCore.Http;

namespace DataAccess.Services
{
	public class AuthService : Interfaces.IAuthService
	{
		private readonly IHttpContextAccessor _httpContextAccessor;

		public AuthService(IHttpContextAccessor httpContextAccessor)
		{
			_httpContextAccessor = httpContextAccessor;
		}

		public string GetCurrentUserId()
		{
			return _httpContextAccessor.HttpContext.User.FindFirst("user_id").Value;
		}
	}
}
