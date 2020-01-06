using MediatR;
using System.Collections.Generic;

namespace Application.Comments.Queries
{
    public class GetPhotoCommentsQuery : IRequest<IEnumerable<PhotoCommentsList>>
    {
        public System.Guid PhotoId { get; set; }
        
    }
}
