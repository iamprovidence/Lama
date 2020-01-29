using MediatR;

using AutoMapper;

using Domains.Entities;

using System.Linq;
using System.Threading;
using System.Threading.Tasks;

using Application.Common.Interfaces;

namespace Application.Users.Commands.ModifyUser
{
    public class ModifyUserCommandHandler : IRequestHandler<ModifyUserCommand, bool>
    {
        private readonly IMapper _mapper;
        private readonly IApplicationDbContext _context;

        public ModifyUserCommandHandler(IMapper mapper, IApplicationDbContext context)
        {
            _mapper = mapper;
            _context = context;
        }

        public async Task<bool> Handle(ModifyUserCommand request, CancellationToken cancellationToken)
        {
            bool isUserAlreadyRegistered = _context.Set<User>().Any(u => u.Id == request.Uid);
            User user = _mapper.Map<User>(request);

            if (isUserAlreadyRegistered) _context.Set<User>().Update(user);
            else await _context.Set<User>().AddAsync(user, cancellationToken);

            try
            {
                await _context.SaveChangesAsync(cancellationToken);
                return true;
            }
            catch (Microsoft.EntityFrameworkCore.DbUpdateException)
            {
                return false;
            }
        }
    }
}
