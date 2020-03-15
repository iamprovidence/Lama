namespace Domains.Entities
{
	public class SharedPhoto
	{
		public string SharedWithUserEmail { get; set; }
		public User User { get; set; }

		public System.Guid PhotoId { get; set; }

		public System.DateTime SharedAt { get; set; }
	}
}
