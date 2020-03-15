namespace Domains.Exceptions
{
	public sealed class PhotoIsAlreadySharedException : System.Exception
	{
		public PhotoIsAlreadySharedException(string userEmail)
			: base($"Current photo has already been shared with {userEmail}.")
		{
		}
	}
}
