using FluentValidation;

namespace Application.PhotoAlbums.Commands.UpdateAlbumPhotos
{
    public class UpdateAlbumPhotosCommandValidator : AbstractValidator<UpdateAlbumPhotosCommand>
    {
        public UpdateAlbumPhotosCommandValidator()
        {
            RuleForEach(ap => ap.Photos)
                .Must((command, value) => value.AlbumId == command.AlbumId)
                    .WithMessage("All photos must belong to the same album");
        }
    }
}
