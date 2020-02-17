using FluentValidation;

namespace Application.Albums.Commands.UpdateAlbum
{
    public class UpdateAlbumCommandValidator : AbstractValidator<UpdateAlbumCommand>
    {
        public UpdateAlbumCommandValidator()
        {
            RuleFor(a => a.Title)
                .NotEmpty();
        }
    }
}
