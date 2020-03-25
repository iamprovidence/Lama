using FluentValidation;

namespace Application.Sharing.Commands.SharePhoto
{
	public class SharePhotoCommandValidator : AbstractValidator<SharePhotoCommand>
	{
		public SharePhotoCommandValidator()
		{
			RuleFor(sp => sp.PhotoId)
				.NotEmpty();

			RuleFor(sp => sp.UserEmail)
				.NotEmpty()
				.EmailAddress();
		}
	}
}
