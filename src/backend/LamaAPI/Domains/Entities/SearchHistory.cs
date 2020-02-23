namespace Domains.Entities
{
    public class SearchHistory
    {
        public int Id { get; set; }

        public string Text { get; set; }
        public System.DateTime SearchDate { get; set; }

        public string UserId { get; set; }
        public User User { get; set; }
    }
}
