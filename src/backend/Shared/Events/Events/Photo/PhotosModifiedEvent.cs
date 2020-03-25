using System;
using System.Collections.Generic;

namespace Events.Photo
{
	public class PhotosModifiedEvent : EventBus.Abstraction.Events.IntegrationEvent
	{
		public string UserId { get; private set; }
		public IEnumerable<Guid> PhotoIds { get; private set; }

		public PhotosModifiedEvent(string userId, IEnumerable<Guid> photoIds)
		{
			UserId = userId;
			PhotoIds = photoIds;
		}
	}
}
