using MediatR;

namespace Application.Albums.Commands.DeleteAlbum
{
    public class DeleteAlbumCommand : IRequest
    {
        public int AlbumId { get; set; }
    }
}
