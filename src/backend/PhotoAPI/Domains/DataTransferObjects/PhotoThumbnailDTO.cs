namespace Domains.DataTransferObjects
{
	public class PhotoThumbnailDTO
	{
		public System.Guid PhotoId { get; set; }

		public string PhotoUrl64 { get; set; }
		public string PhotoUrl256 { get; set; }
	}
}
