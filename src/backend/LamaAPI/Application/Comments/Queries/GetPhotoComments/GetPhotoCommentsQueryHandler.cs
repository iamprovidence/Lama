using MediatR;

using Domains.Entities;

using AutoMapper;
using AutoMapper.QueryableExtensions;

using Microsoft.EntityFrameworkCore;

using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using System.Collections.Generic;

using Application.Common.Interfaces;

namespace Application.Comments.Queries.GetPhotoComments
{
    public class GetPhotoCommentsQueryHandler : IRequestHandler<GetPhotoCommentsQuery, IEnumerable<PhotoCommentsList>>
    {
        private readonly IMapper _mapper;
        private readonly IApplicationDbContext _context;

        public GetPhotoCommentsQueryHandler(IMapper mapper, IApplicationDbContext context)
        {
            _mapper = mapper;
            _context = context;
        }

        public async Task<IEnumerable<PhotoCommentsList>> Handle(GetPhotoCommentsQuery request, CancellationToken cancellationToken)
        {
            return await _context
                .Set<Comment>()
                .Where(c => c.PhotoId == request.PhotoId)
                .OrderByDescending(c => c.CreatedAt)
                .ProjectTo<PhotoCommentsList>(_mapper.ConfigurationProvider)
                .ToArrayAsync(cancellationToken);
        }
    }
}
