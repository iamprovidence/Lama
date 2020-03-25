using Events.Photo;
using EventBus.Abstraction.Interfaces;

using System.Threading.Tasks;
using System.Collections.Generic;

using BusinessLogic.Interfaces;

using DataAccess.Interfaces;

using Microsoft.AspNetCore.SignalR;

using API.Hubs;

using Domains.DataTransferObjects;

namespace API.ServerSideEvents
{
	public class CreateThumbnailsOnPhotosModifiedEventHandler : IIntegrationEventHandler<PhotosModifiedEvent>
	{
		private readonly IPhotoService _photoService;
		private readonly IConnectionManager _connectionManager;
		private readonly IHubContext<PhotosHub, IClientPhotosHub> _photosHubContext;

		public CreateThumbnailsOnPhotosModifiedEventHandler(
			IPhotoService photoService,
			IConnectionManager connectionManager,
			IHubContext<PhotosHub, IClientPhotosHub> photosHubContext)
		{
			_photoService = photoService;
			_connectionManager = connectionManager;
			_photosHubContext = photosHubContext;
		}

		public async Task Handle(PhotosModifiedEvent integrationEvent)
		{
			IEnumerable<PhotoThumbnailDTO> thumbnails = await _photoService.CreateThumbnailsToPhotosAsync(integrationEvent.PhotoIds);

			string userId = integrationEvent.UserId;
			IReadOnlyList<string> connections = _connectionManager.GetConnections(userId);

			await _photosHubContext.Clients.Clients(connections).UpdateThumbnails(thumbnails);
		}
	}
}
