using MediatR;

using AutoMapper;
using AutoMapper.QueryableExtensions;

using Application.Common.Interfaces;
using Application.PhotosSearch.Models;

using System.Linq;
using System.Threading;
using System.Threading.Tasks;

using Domains.Entities;

using Microsoft.EntityFrameworkCore;

namespace Application.PhotosSearch.Commands.AddSearch
{
	public class AddSearchCommandHandler : IRequestHandler<AddSearchCommand, SearchHistoryListDTO>
	{
		private readonly IMapper _mapper;
		private readonly IApplicationDbContext _context;
		private readonly IAuthService _authService;

		public AddSearchCommandHandler(IMapper mapper, IApplicationDbContext context, IAuthService authService)
		{
			_mapper = mapper;
			_context = context;
			_authService = authService;
		}

		public async Task<SearchHistoryListDTO> Handle(AddSearchCommand request, CancellationToken cancellationToken)
		{
			SearchHistory searchToSave = _mapper.Map<SearchHistory>(request);
			searchToSave.UserId = _authService.GetCurrentUserId();

			await _context.Set<SearchHistory>().AddAsync(searchToSave, cancellationToken);

			await _context.SaveChangesAsync(cancellationToken);

			return await _context
				.Set<SearchHistory>()
				.Where(sh => sh.Id == searchToSave.Id)
				.ProjectTo<SearchHistoryListDTO>(_mapper.ConfigurationProvider)
				.SingleOrDefaultAsync(cancellationToken);
		}
	}
}
