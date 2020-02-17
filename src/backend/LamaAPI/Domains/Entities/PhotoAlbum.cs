namespace Domains.Entities
{
    public class PhotoAlbum
    {
        public int AlbumId { get; set; }
        public Album Album { get; set; }

        public System.Guid PhotoId { get; set; }
    }
}
