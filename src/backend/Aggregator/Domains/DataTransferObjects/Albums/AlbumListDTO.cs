namespace Domains.DataTransferObjects.Albums
{
    public class AlbumListDTO
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public System.Guid? PhotoId { get; set; }
        public int ItemsAmount { get; set; }
    }
}
