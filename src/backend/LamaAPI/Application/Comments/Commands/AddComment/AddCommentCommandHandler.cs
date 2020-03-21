using MediatR;

using AutoMapper;
using AutoMapper.QueryableExtensions;

using Domains.Entities;

using Application.Common.Interfaces;
using Application.Comments.Queries.GetPhotoComments;

using System.Linq;
using System.Threading;
using System.Threading.Tasks;

using Microsoft.EntityFrameworkCore;

namespace Application.Comments.Commands.AddComment
{
	public class AddCommentCommandHandler : IRequestHandler<AddCommentCommand, PhotoCommentsList>
	{
		private readonly IMapper _mapper;
		private readonly IApplicationDbContext _context;

		public AddCommentCommandHandler(IMapper mapper, IApplicationDbContext context)
		{
			_mapper = mapper;
			_context = context;
		}

		public async Task<PhotoCommentsList> Handle(AddCommentCommand request, CancellationToken cancellationToken)
		{
			Comment newComment = _mapper.Map<Comment>(request);

			_context.Set<Comment>().Add(newComment);

			await _context.SaveChangesAsync(cancellationToken);

			PhotoCommentsList createdComment = await _context
				.Set<Comment>()
				.Where(c => c.Id == newComment.Id)
				.ProjectTo<PhotoCommentsList>(_mapper.ConfigurationProvider)
				.SingleOrDefaultAsync();

			return createdComment;
		}
	}
}
