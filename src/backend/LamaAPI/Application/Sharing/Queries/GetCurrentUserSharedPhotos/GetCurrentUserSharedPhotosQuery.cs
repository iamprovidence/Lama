using Application.Sharing.Models;
using MediatR;
using System.Collections.Generic;

namespace Application.Sharing.Queries.GetSharedPhotos
{
	public class GetCurrentUserSharedPhotosQuery : IRequest<IEnumerable<SharedPhotosDTO>>
	{
	}
}
