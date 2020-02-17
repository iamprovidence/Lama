using System.Collections.Generic;

namespace Application.PhotoAlbums.Commands.UpdateAlbumPhotos
{
    public class UpdateAlbumPhotosCommand : MediatR.IRequest
    {
        public int AlbumId { get; set; }
        public IEnumerable<Models.PhotoAlbumDTO> Photos { get; set; }
    }
}
