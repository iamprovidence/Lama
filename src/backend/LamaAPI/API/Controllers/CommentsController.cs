using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;

using System.Threading.Tasks;
using System.Collections.Generic;

using Application.Comments.Commands.AddComment;
using Application.Comments.Commands.DeleteComment;
using Application.Comments.Queries.GetPhotoComments;

namespace API.Controllers
{
	[Authorize]
    [ApiController]
    public class CommentsController : ApiController
    {
        [HttpGet("all")]
        public Task<IEnumerable<PhotoCommentsList>> Get([FromQuery] GetPhotoCommentsQuery query)
        {
            return Mediator.Send(query);
        }

        [HttpPost("add")]
        public Task<PhotoCommentsList> Post([FromBody] AddCommentCommand command)
        {
            return Mediator.Send(command);
        }

        [HttpDelete("delete")]
        public Task<MediatR.Unit> Delete([FromQuery] DeleteCommentCommand command)
        {
            return Mediator.Send(command);
        }
    }
}
