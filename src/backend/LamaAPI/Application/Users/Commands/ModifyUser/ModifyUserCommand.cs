using MediatR;

namespace Application.Users.Commands.ModifyUser
{
    public class ModifyUserCommand : IRequest<bool>
    {
        public string Uid { get; set; }
        public string Email { get; set; }
        public string PhotoURL { get; set; }
        public string DisplayName { get; set; }
    }
}
