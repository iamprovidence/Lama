using AutoMapper;

using Domains.Entities;

using Application.PhotosSearch.Models;
using Application.PhotosSearch.Commands.AddSearch;

namespace Application.PhotosSearch
{
    public class PhotosSearchProfile : Profile
    {
        public PhotosSearchProfile()
        {
            CreateMap<SearchHistory, SearchHistoryListDTO>();

            CreateMap<string, SearchHistoryListDTO>()
                .ForMember(
                    dest => dest.Text,
                    opts => opts.MapFrom(src => src));

            CreateMap<AddSearchCommand, SearchHistory>()
                .ForMember(
                    dest => dest.SearchDate,
                    opts => opts.MapFrom(src => System.DateTime.Now));
        }
    }
}
