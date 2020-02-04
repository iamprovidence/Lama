using System;
using System.Collections.Generic;

namespace Events.Photo
{
    public class PhotosDeletedEvent : EventBus.Abstraction.Events.IntegrationEvent
    {
        public IEnumerable<Guid> PhotoIds { get; private set; }

        public PhotosDeletedEvent(IEnumerable<Guid> photoIds)
        {
            PhotoIds = photoIds;
        }
    }
}
