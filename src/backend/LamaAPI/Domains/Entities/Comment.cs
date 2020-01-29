namespace Domains.Entities
{
    public class Comment
    {
        public int Id { get; set; }
        public string Text { get; set; }
        public System.DateTime CreatedAt { get; set; }

        public string UserId { get; set; }
        public User User { get; set; }

        public System.Guid PhotoId { get; set; }
    }
}
