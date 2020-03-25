using MediatR;
using Application.Albums.Models;

namespace Application.Albums.Commands.CreateAlbum
{
    public class CreateAlbumCommand : IRequest<AlbumList>
    {
        public string Title { get; set; }
    }
}
