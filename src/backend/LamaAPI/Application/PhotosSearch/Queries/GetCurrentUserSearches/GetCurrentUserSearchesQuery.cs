using MediatR;
using System.Collections.Generic;
using Application.PhotosSearch.Models;

namespace Application.PhotosSearch.Queries.GetCurrentUserSearches
{
    public class GetCurrentUserSearchesQuery : IRequest<IEnumerable<SearchHistoryListDTO>>
    {
        public int MaxAmount { get; set; } = 10;
    }
}
