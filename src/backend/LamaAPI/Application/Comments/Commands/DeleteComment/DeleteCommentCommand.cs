using MediatR;

namespace Application.Comments.Commands.DeleteComment
{
    public class DeleteCommentCommand : IRequest
    {
        public int CommentId { get; set; }
    }
}
