using FluentValidation;

namespace Application.Albums.Commands.CreateAlbum
{
    public class CreateAlbumCommandValidator : AbstractValidator<CreateAlbumCommand>
    {
        public CreateAlbumCommandValidator()
        {
            RuleFor(a => a.Title)
                .NotEmpty();
        }
    }
}
