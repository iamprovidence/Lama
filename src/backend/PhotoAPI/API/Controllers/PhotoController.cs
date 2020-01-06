using System.Collections.Generic;

using EventBus.Abstraction.Interfaces;

using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PhotoController : ControllerBase
    {
        IEventBus _eventBus;

        public PhotoController(IEventBus eventBus)
        {
            _eventBus = eventBus;
        }

        [HttpDelete]
        public void Delete()
        {
            _eventBus.Publish(new Events.Photo.PhotoDeletedEvent(System.Guid.NewGuid()));
        }
    }
}
