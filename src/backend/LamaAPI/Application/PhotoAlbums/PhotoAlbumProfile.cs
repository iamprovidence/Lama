using AutoMapper;
using Domains.Entities;
using Application.PhotoAlbums.Models;

namespace Application.PhotoAlbums
{
    public class PhotoAlbumProfile : Profile
    {
        public PhotoAlbumProfile()
        {
            CreateMap<PhotoAlbum, PhotoAlbumDTO>()
                .ReverseMap();
        }
    }
}
