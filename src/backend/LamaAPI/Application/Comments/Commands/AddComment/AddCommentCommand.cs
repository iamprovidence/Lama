using MediatR;
using Application.Comments.Queries.GetPhotoComments;

namespace Application.Comments.Commands.AddComment
{
    public class AddCommentCommand : IRequest<PhotoCommentsList>
    {
        public string Text { get; set; }
        public System.Guid PhotoId { get; set; }
        public string UserId { get; set; }
    }
}
