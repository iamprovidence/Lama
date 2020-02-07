using FluentValidation;

namespace Application.Comments.Commands.AddComment
{
    public class AddCommentCommandValidator : AbstractValidator<AddCommentCommand>
    {
        public AddCommentCommandValidator()
        {
            int maxCommentLength = 1250;

            RuleFor(c => c.Text)
                .NotEmpty()
                .MaximumLength(maxCommentLength)
                    .WithMessage($"Comment's text can not be longer than {maxCommentLength} chars");
        }
    }
}
