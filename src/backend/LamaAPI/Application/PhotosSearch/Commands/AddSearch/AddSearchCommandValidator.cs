using FluentValidation;

namespace Application.PhotosSearch.Commands.AddSearch
{
    public class AddSearchCommandValidator : AbstractValidator<AddSearchCommand>
    {
        public AddSearchCommandValidator()
        {
            RuleFor(s => s.Text)
                .NotEmpty();
        }
    }
}
