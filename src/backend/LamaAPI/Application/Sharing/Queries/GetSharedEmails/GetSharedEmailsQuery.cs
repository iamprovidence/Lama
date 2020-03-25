using System.Collections.Generic;

namespace Application.Sharing.Queries.GetSharedEmails
{
	public class GetSharedEmailsQuery : MediatR.IRequest<IEnumerable<Models.SharedEmailsListDTO>>
	{
		public System.Guid PhotoId { get; set; }
	}
}
