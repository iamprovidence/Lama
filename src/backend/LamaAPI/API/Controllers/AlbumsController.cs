using MediatR;

using System.Threading.Tasks;
using System.Collections.Generic;

using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;

using Application.Albums.Models;
using Application.Albums.Commands.CreateAlbum;
using Application.Albums.Commands.UpdateAlbum;
using Application.Albums.Commands.DeleteAlbum;
using Application.Albums.Queries.GetCurrentUserAlbums;

namespace API.Controllers
{
    [Authorize]
    [ApiController]
    public class AlbumsController : ApiController
    {
        [HttpGet("all")]
        public Task<IEnumerable<AlbumList>> Get([FromQuery]GetCurrentUserAlbumsQuery query)
        {
            return Mediator.Send(query);
        }

        [HttpPost("add")]
        public Task<AlbumList> Post([FromBody]CreateAlbumCommand command)
        {
            return Mediator.Send(command);
        }

        [HttpPut("update")]
        public Task<AlbumList> Put([FromBody]UpdateAlbumCommand command)
        {
            return Mediator.Send(command);
        }

        [HttpDelete("delete")]
        public Task<Unit> Delete([FromQuery]DeleteAlbumCommand command)
        {
            return Mediator.Send(command);
        }
	}
}
