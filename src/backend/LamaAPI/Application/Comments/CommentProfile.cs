using AutoMapper;
using Domains.Entities;

namespace Application.Comments
{
    internal sealed class CommentProfile : Profile
    {
        public CommentProfile()
        {
            CreateMap<Comment, Queries.GetPhotoComments.PhotoCommentsList>()
                .ForMember(
                    dest => dest.UserName,
                    opts => opts.MapFrom(src => src.User.DisplayName))
                .ForMember(
                    dest => dest.UserAvatarUrl,
                    opts => opts.MapFrom(src => src.User.PhotoURL));

            CreateMap<Commands.AddComment.AddCommentCommand, Comment>()
                .ForMember(
                    dest => dest.CreatedAt,
                    opts => opts.MapFrom(src => System.DateTime.Now));
        }
    }
}
