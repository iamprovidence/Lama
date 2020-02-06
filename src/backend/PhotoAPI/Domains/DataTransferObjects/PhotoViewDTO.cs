namespace Domains.DataTransferObjects
{
    public class PhotoViewDTO
    {
        public System.Guid Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }

        public string PhotoUrl { get; set; }

        public string UserId { get; set; }
    }
}
