namespace Application.Albums.Models
{
    public class AlbumList
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public System.Guid? PhotoId { get; set; }
        public int ItemsAmount { get; set; }
    }
}
