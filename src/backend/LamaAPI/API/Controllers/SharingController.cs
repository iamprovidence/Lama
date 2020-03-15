using MediatR;

using Application.Sharing.Models;
using Application.Sharing.Queries.GetSharedPhotos;
using Application.Sharing.Queries.GetSharedEmails;
using Application.Sharing.Commands.DeleteSharedPhoto;
using Application.Sharing.Commands.SharePhoto;

using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;

using System.Threading.Tasks;
using System.Collections.Generic;

namespace API.Controllers
{
	[Authorize]
	[ApiController]
	public class SharingController : ApiController
	{

		[HttpGet("photos")]
		public Task<IEnumerable<SharedPhotosDTO>> Get([FromQuery]GetCurrentUserSharedPhotosQuery query)
		{
			return Mediator.Send(query);
		}

		[HttpGet("emails")]
		public Task<IEnumerable<SharedEmailsListDTO>> Get([FromQuery]GetSharedEmailsQuery query)
		{
			return Mediator.Send(query);
		}

		[HttpPost("share-photo")]
		public Task<SharedEmailsListDTO> Post([FromBody]SharePhotoCommand command)
		{
			return Mediator.Send(command);
		}

		[HttpDelete("delete")]
		public Task<Unit> Delete([FromBody]DeleteSharedPhotoCommand command)
		{
			return Mediator.Send(command);
		}
	}
}
