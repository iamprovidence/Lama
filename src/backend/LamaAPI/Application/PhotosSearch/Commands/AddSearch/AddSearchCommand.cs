using MediatR;
using Application.PhotosSearch.Models;

namespace Application.PhotosSearch.Commands.AddSearch
{
    public class AddSearchCommand : IRequest<SearchHistoryListDTO>
    {
        public string Text { get; set; }
    }
}
