namespace Application.Comments.Queries.GetPhotoComments
{
    public class PhotoCommentsList
    {
        public int Id { get; set; }
        public string Text { get; set; }
        public System.DateTime CreatedAt { get; set; }

        public string UserId { get; set; }
        public string UserName { get; set; }
        public string UserAvatarUrl { get; set; }
    }
}
