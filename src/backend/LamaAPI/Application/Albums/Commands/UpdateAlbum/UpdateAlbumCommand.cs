using MediatR;
using Application.Albums.Models;

namespace Application.Albums.Commands.UpdateAlbum
{
    public class UpdateAlbumCommand : IRequest<AlbumList>
    {
        public int Id { get; set; }
        public string Title { get; set; }
    }
}
