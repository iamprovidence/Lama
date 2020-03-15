namespace Application.Sharing.Commands.SharePhoto
{
	public class SharePhotoCommand : MediatR.IRequest<Models.SharedEmailsListDTO>
	{
		public System.Guid PhotoId { get; set; }
		public string UserEmail { get; set; }
	}
}
