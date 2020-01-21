using AutoMapper;
using Domains.Entities;

namespace Application.Comments
{
    internal class CommentProfile : Profile
    {
        public CommentProfile()
        {
            CreateMap<Comment, Queries.GetPhotoComments.PhotoCommentsList>();

            CreateMap<Commands.AddComment.AddCommentCommand, Comment>()
                .ForMember(
                    dest => dest.CreatedAt,
                    opts => opts.MapFrom(src => System.DateTime.Now));
        }
    }
}
