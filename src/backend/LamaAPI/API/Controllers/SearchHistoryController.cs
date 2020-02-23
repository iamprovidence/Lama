using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;

using System.Threading.Tasks;
using System.Collections.Generic;

using Application.PhotosSearch.Models;
using Application.PhotosSearch.Commands.AddSearch;
using Application.PhotosSearch.Queries.GetCurrentUserSearches;

namespace API.Controllers
{
    [Authorize]
    [ApiController]
    public class SearchHistoryController : ApiController
    {
        [HttpGet("all")]
        public Task<IEnumerable<SearchHistoryListDTO>> Get([FromQuery]GetCurrentUserSearchesQuery query)
        {
            return Mediator.Send(query);
        }

        [HttpPost("add")]
        public Task<SearchHistoryListDTO> Post([FromBody]AddSearchCommand command)
        {
            return Mediator.Send(command);
        }
    }
}
