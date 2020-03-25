using ApiResponse.Enums;
using ApiResponse.Exceptions;

namespace Domains.Exceptions
{
	public sealed class PhotoIsAlreadySharedException : UserFriendlyException
	{
		public PhotoIsAlreadySharedException(string userEmail)
			: base(NotificationType.Error, $"Current photo has already been shared with {userEmail}.")
		{
		}
	}
}
