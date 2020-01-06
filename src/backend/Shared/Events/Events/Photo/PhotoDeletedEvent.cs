using System;

namespace Events.Photo
{
    public class PhotoDeletedEvent : EventBus.Abstraction.Events.IntegrationEvent
    {
        public Guid PhotoId { get; private set; }

        public PhotoDeletedEvent(Guid photoId)
        {
            PhotoId = photoId;
        }
    }
}
