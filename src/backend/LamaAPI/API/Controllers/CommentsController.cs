using Microsoft.AspNetCore.Mvc;

using System.Threading.Tasks;
using System.Collections.Generic;

using Application.Comments.Queries;
using Application.Comments.Commands.AddComment;
using Application.Comments.Commands.DeleteComment;

namespace API.Controllers
{
    [ApiController]
    public class CommentsController : ApiController
    {
        [HttpGet]
        public Task<IEnumerable<PhotoCommentsList>> Get([FromQuery] GetPhotoCommentsQuery query)
        {
            return Mediator.Send(query);
        }

        [HttpPost]
        public Task<int> Post([FromBody] AddCommentCommand command)
        {
            return Mediator.Send(command);
        }

        [HttpDelete]
        public Task<MediatR.Unit> Delete([FromQuery] DeleteCommentCommand command)
        {
            return Mediator.Send(command);
        }
    }
}
