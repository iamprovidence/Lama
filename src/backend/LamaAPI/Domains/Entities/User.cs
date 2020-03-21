using System.Collections.Generic;

namespace Domains.Entities
{
	public class User
	{
		public string Id { get; set; }
		public string DisplayName { get; set; }
		public string Email { get; set; }
		public string PhotoURL { get; set; }

		public ICollection<Comment> Comments { get; private set; } = new List<Comment>();
		public ICollection<Album> Albums { get; private set; } = new List<Album>();
		public ICollection<SearchHistory> Searches { get; private set; } = new List<SearchHistory>();
		public ICollection<SharedPhoto> SharedPhotos { get; private set; } = new List<SharedPhoto>();
		public ICollection<Notification> Notifications { get; private set; } = new List<Notification>();
	}
}
