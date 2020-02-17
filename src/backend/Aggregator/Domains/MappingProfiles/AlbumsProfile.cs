using AutoMapper;
using Domains.Aggregation;
using Domains.DataTransferObjects.Albums;

namespace Domains.MappingProfiles
{
    public class AlbumsProfile : Profile
    {
        public AlbumsProfile()
        {
            CreateMap<AlbumListDTO, AlbumList>();
        }
    }
}
