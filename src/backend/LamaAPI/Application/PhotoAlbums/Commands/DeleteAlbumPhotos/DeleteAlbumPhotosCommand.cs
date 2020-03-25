using System.Collections.Generic;

namespace Application.PhotoAlbums.Commands.DeleteAlbumPhotos
{
    public class DeleteAlbumPhotosCommand : MediatR.IRequest
    {
        public IEnumerable<Models.PhotoAlbumDTO> Photos { get; set; }
    }
}
