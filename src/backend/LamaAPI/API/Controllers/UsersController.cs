using System.Threading.Tasks;

using Application.Users.Commands.ModifyUser;

using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;

namespace API.Controllers
{
    [ApiController]
    [AllowAnonymous]
    public class UsersController : ApiController
    {
        [HttpPost("update")]
        public Task<bool> Post([FromBody] ModifyUserCommand command)
        {
            return Mediator.Send(command);
        }
    }
}
