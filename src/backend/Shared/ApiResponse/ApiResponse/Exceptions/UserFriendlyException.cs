using System;
using System.Runtime.Serialization;

using ApiResponse.Enums;

namespace ApiResponse.Exceptions
{
	public class UserFriendlyException : Exception
	{
		public NotificationType NotificationType { get; }

		public UserFriendlyException(NotificationType notificationType)
		{
			this.NotificationType = notificationType;
		}

		public UserFriendlyException(NotificationType notificationType, string message)
			: base(message)
		{
			this.NotificationType = notificationType;
		}

		public UserFriendlyException(NotificationType notificationType, string message, Exception innerException)
			: base(message, innerException)
		{
			this.NotificationType = notificationType;
		}

		protected UserFriendlyException(NotificationType notificationType, SerializationInfo info, StreamingContext context)
			: base(info, context)
		{
			this.NotificationType = notificationType;
		}
	}
}
