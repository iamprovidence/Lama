using MediatR;

using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;

using Application.PhotoAlbums.Models;
using Application.PhotoAlbums.Queries.GetAlbumPhotos;
using Application.PhotoAlbums.Commands.UpdateAlbumPhotos;
using Application.PhotoAlbums.Commands.DeleteAlbumPhotos;

using System.Threading.Tasks;
using System.Collections.Generic;

namespace API.Controllers
{
    [Authorize]
    [ApiController]
    public class PhotoAlbumsController : ApiController
    {
        [HttpGet("all")]
        public Task<IEnumerable<PhotoAlbumDTO>> Get([FromQuery]GetAlbumPhotosQuery query)
        {
            return Mediator.Send(query);
        }

        [HttpPost("update")]
        public Task<Unit> Post([FromBody]UpdateAlbumPhotosCommand command)
        {
            return Mediator.Send(command);
        }

        [HttpDelete("delete")]
        public Task<Unit> Delete([FromBody]DeleteAlbumPhotosCommand command)
        {
            return Mediator.Send(command);
        }
    }
}
