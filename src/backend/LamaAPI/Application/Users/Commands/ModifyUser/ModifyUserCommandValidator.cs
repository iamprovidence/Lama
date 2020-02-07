using FluentValidation;

namespace Application.Users.Commands.ModifyUser
{
    public class ModifyUserCommandValidator : AbstractValidator<ModifyUserCommand>
    {
        public ModifyUserCommandValidator()
        {
            RuleFor(u => u.Uid)
                .NotEmpty();

            RuleFor(u => u.Email)
                .NotEmpty();
        }
    }
}
