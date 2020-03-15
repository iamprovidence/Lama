using MediatR;

using Domains.Entities;
using Domains.Exceptions;

using System.Threading;
using System.Threading.Tasks;

using Application.Common.Interfaces;

namespace Application.Sharing.Commands.DeleteSharedPhoto
{
	public class DeleteSharedPhotoCommandHandler : IRequestHandler<DeleteSharedPhotoCommand>
	{
		private readonly IApplicationDbContext _context;

		public DeleteSharedPhotoCommandHandler(IApplicationDbContext context)
		{
			_context = context;
		}

		public async Task<Unit> Handle(DeleteSharedPhotoCommand request, CancellationToken cancellationToken)
		{
			SharedPhoto sharingToRemove = await _context
				.Set<SharedPhoto>()
				.FindAsync(new object[] { request.PhotoId, request.UserEmail }, cancellationToken);
			if (sharingToRemove == null) throw new NotFoundException("Photo is not shared.");

			_context.Set<SharedPhoto>().Remove(sharingToRemove);

			await _context.SaveChangesAsync(cancellationToken);

			return Unit.Value;
		}
	}
}
