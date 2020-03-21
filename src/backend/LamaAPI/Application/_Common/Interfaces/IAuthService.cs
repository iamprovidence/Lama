namespace Application.Common.Interfaces
{
    public interface IAuthService
    {
        string GetCurrentUserId();
		string GetCurrentUserEmail();
	}
}
