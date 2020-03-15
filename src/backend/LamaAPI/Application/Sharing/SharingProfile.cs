using Application.Sharing.Commands.SharePhoto;
using Application.Sharing.Models;
using Domains.Entities;

namespace Application.Sharing
{
	public class SharingProfile : AutoMapper.Profile
	{
		public SharingProfile()
		{
			CreateMap<SharedPhoto, SharedEmailsListDTO>()
				.ForMember(
					dest => dest.UserEmail,
					opts => opts.MapFrom(src => src.SharedWithUserEmail))
				.ForMember(
					dest => dest.PhotoId,
					opts => opts.MapFrom(src => src.PhotoId));

			CreateMap<SharePhotoCommand, SharedPhoto>()
				.ForMember(
					dest => dest.SharedWithUserEmail,
					opts => opts.MapFrom(src => src.UserEmail))
				.ForMember(
					dest => dest.PhotoId,
					opts => opts.MapFrom(src => src.PhotoId));

			CreateMap<SharedPhoto, SharedPhotosDTO>()
				.ForMember(
					dest => dest.PhotoId,
					opts => opts.MapFrom(src => src.PhotoId));
		}
	}
}
