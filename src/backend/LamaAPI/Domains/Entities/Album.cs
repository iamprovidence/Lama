using System.Collections.Generic;

namespace Domains.Entities
{
    public class Album
    {
        public int Id { get; set; }
        public string Title { get; set; }

        public string UserId { get; set; }
        public User User { get; set; }

        public ICollection<PhotoAlbum> PhotoAlbums { get; private set; } = new List<PhotoAlbum>();
    }
}
