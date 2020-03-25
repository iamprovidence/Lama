using FluentValidation;

namespace Application.Sharing.Commands.DeleteSharedPhoto
{
	public class DeleteSharedPhotoCommandValidator : AbstractValidator<DeleteSharedPhotoCommand>
	{
		public DeleteSharedPhotoCommandValidator()
		{
			RuleFor(sp => sp.PhotoId)
				.NotEmpty();

			RuleFor(sp => sp.UserEmail)
				.NotEmpty()
				.EmailAddress();
		}
	}
}
