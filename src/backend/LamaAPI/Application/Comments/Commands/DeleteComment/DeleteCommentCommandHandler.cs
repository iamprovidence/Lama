using MediatR;

using Domains.Entities;
using Domains.Exceptions;

using System.Threading;
using System.Threading.Tasks;

using Application.Common.Interfaces;

namespace Application.Comments.Commands.DeleteComment
{
    public class DeleteCommentCommandHandler : IRequestHandler<DeleteCommentCommand>
    {
        private readonly IApplicationDbContext _context;

        public DeleteCommentCommandHandler(IApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<Unit> Handle(DeleteCommentCommand request, CancellationToken cancellationToken)
        {
            Comment commentToRemove = await _context.Set<Comment>().FindAsync(request.CommentId);
            if (commentToRemove == null) throw new NotFoundException(nameof(Comment), request.CommentId);

            _context.Set<Comment>().Remove(commentToRemove);

            await _context.SaveChangesAsync(cancellationToken);

            return Unit.Value;
        }
    }
}
