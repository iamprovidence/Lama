namespace Application.Sharing.Commands.DeleteSharedPhoto
{
	public class DeleteSharedPhotoCommand : MediatR.IRequest
	{
		public System.Guid PhotoId { get; set; }
		public string UserEmail { get; set; }
	}
}
