using MediatR;
using System.Collections.Generic;

namespace Application.PhotoAlbums.Queries.GetAlbumPhotos
{
    public class GetAlbumPhotosQuery : IRequest<IEnumerable<Models.PhotoAlbumDTO>>
    {
        public int AlbumId { get; set; }
    }
}
