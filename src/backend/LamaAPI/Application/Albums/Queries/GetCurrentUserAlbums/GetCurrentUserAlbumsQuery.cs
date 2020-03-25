using MediatR;
using System.Collections.Generic;
using Application.Albums.Models;

namespace Application.Albums.Queries.GetCurrentUserAlbums
{
    public class GetCurrentUserAlbumsQuery : IRequest<IEnumerable<AlbumList>>
    {
    }
}
