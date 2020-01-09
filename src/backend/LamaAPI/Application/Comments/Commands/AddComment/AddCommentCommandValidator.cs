using FluentValidation;

namespace Application.Comments.Commands.AddComment
{
    public class AddCommentCommandValidator : AbstractValidator<AddCommentCommand>
    {
        public AddCommentCommandValidator()
        {
            RuleFor(c => c.Text)
                .NotEmpty();
        }
    }
}
