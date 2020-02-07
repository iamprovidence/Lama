using AutoMapper;
using Domains.Entities;
using Application.Users.Commands.ModifyUser;

namespace Application.Users
{
    internal sealed class UserProfile : Profile
    {
        public UserProfile()
        {
            CreateMap<ModifyUserCommand, User>()
                .ForMember(
                    dest => dest.Id,
                    opts => opts.MapFrom(src => src.Uid));
        }
    }
}
