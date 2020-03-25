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

			CreateMap<PhotoDocument, PhotoThumbnailDTO>()
				.ForMember(
					dest => dest.PhotoId,
					opts => opts.MapFrom(src => src.Id))
				.ForMember(
					dest => dest.PhotoUrl64,
					opts => opts.MapFrom(src => src.Blob64Name))
				.ForMember(
					dest => dest.PhotoUrl256,
					opts => opts.MapFrom(src => src.Blob256Name));

			CreateMap<PhotoDocument, PhotoViewDTO>()
				.ForMember(
					dest => dest.PhotoUrl,
					opts => opts.MapFrom(src => src.BlobName));

			CreateMap<PhotoToUploadDTO, PhotoDocument>();

			CreateMap<PhotoDocument, DeletedPhotosListDTO>()
				.ForMember(
					dest => dest.PhotoUrl256,
					opts => opts.MapFrom(src => src.Blob256Name));

			CreateMap<PhotoDocument, OriginalPhotoDTO>()
				.ForMember(
					dest => dest.PhotoUrl,
					opts => opts.MapFrom(src => src.OriginalBlobName));
		}
	}
}
