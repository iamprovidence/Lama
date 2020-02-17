using AutoMapper;

using Domains.Entities;

using Application.Albums.Models;
using Application.Albums.Commands.CreateAlbum;
using Application.Albums.Commands.UpdateAlbum;

using System.Linq;

namespace Application.Albums
{
    internal sealed class AlbumProfile : Profile
    {
        public AlbumProfile()
        {
            CreateMap<Album, AlbumList>()
                .ForMember(
                    dest => dest.PhotoId,
                    opts => 
                    {
                        opts.PreCondition(src => src.PhotoAlbums.Any());
                        opts.MapFrom(src => src.PhotoAlbums.FirstOrDefault().PhotoId);
                    })
                .ForMember(
                    dest => dest.ItemsAmount,
                    opts => opts.MapFrom(src => src.PhotoAlbums.Count));

            CreateMap<CreateAlbumCommand, Album>();

            CreateMap<UpdateAlbumCommand, Album>();
        }
    }
}
