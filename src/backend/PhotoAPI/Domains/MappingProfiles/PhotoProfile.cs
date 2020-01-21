using AutoMapper;

using Domains.DataTransferObjects;
using Domains.ElasticsearchDocuments;

namespace Domains.MappingProfiles
{
    public class PhotoProfile : Profile
    {
        public PhotoProfile()
        {
            CreateMap<PhotoDocument, PhotoListDTO>()
                .ForMember(
                    dest => dest.PhotoUrl64,
                    opts => opts.MapFrom(src => src.Blob64Name))
                .ForMember(
                    dest => dest.PhotoUrl256,
                    opts => opts.MapFrom(src => src.Blob256Name));
            CreateMap<PhotoToUploadDTO, PhotoDocument>();
        }
    }
}
