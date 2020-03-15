using MediatR;

using AutoMapper;

using Application.Sharing.Models;
using Application.Common.Interfaces;

using System.Threading;
using System.Threading.Tasks;

using Domains.Entities;
using Domains.Exceptions;

using Microsoft.EntityFrameworkCore;

namespace Application.Sharing.Commands.SharePhoto
{
	public class SharePhotoCommandHandler : IRequestHandler<SharePhotoCommand, SharedEmailsListDTO>
	{
		private readonly IMapper _mapper;
		private readonly IApplicationDbContext _context;

		public SharePhotoCommandHandler(IMapper mapper, IApplicationDbContext context)
		{
			_mapper = mapper;
			_context = context;
		}

		public async Task<SharedEmailsListDTO> Handle(SharePhotoCommand request, CancellationToken cancellationToken)
		{
			bool isPhotoAlreadyShared = await _context
				.Set<SharedPhoto>()
				.AnyAsync(sp => sp.PhotoId == request.PhotoId && sp.SharedWithUserEmail == request.UserEmail, cancellationToken);
			if (isPhotoAlreadyShared) throw new PhotoIsAlreadySharedException(request.UserEmail);

			SharedPhoto sharedPhoto = _mapper.Map<SharedPhoto>(request);
			await _context.Set<SharedPhoto>().AddAsync(sharedPhoto, cancellationToken);

			await _context.SaveChangesAsync(cancellationToken);

			return _mapper.Map<SharedEmailsListDTO>(sharedPhoto);
		}
	}
}
