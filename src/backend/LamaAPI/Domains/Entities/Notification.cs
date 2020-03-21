using System;

namespace Domains.Entities
{
	public class Notification
	{
		public long Id { get; set; }
		public string Message { get; set; }

		public DateTime CreatedAt { get; set; }
		public DateTime? ReadAt { get; set; }

		public string UserId { get; set; }
		public User User { get; set; }

		public void MarkAsRead()
		{
			ReadAt = DateTime.Now;
		}

		public Notification AddNotification(string userId, string message)
		{
			UserId = userId;
			Message = message;
			CreatedAt = DateTime.Now;
			return this;
		}
	}
}
