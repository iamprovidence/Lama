using MediatR;

namespace Application.Comments.Commands.AddComment
{
    public class AddCommentCommand : IRequest<int>
    {
        public string Text { get; set; }
        public System.Guid PhotoId { get; set; }
        public int UserId { get; set; }
    }
}
