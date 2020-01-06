using MediatR;

using AutoMapper;

using Domains.Entities;

using Application.Common.Interfaces;

using System.Threading;
using System.Threading.Tasks;

namespace Application.Comments.Commands.AddComment
{
    public class AddCommentCommandHandler : IRequestHandler<AddCommentCommand, int>
    {
        private readonly IMapper _mapper;
        private readonly IApplicationDbContext _context;

        public AddCommentCommandHandler(IMapper mapper, IApplicationDbContext context)
        {
            _mapper = mapper;
            _context = context;
        }

        public async Task<int> Handle(AddCommentCommand request, CancellationToken cancellationToken)
        {
            Comment newComment = _mapper.Map<Comment>(request);

            _context.Set<Comment>().Add(newComment);

            await _context.SaveChangesAsync(cancellationToken);

            return newComment.Id;
        }
    }
}
