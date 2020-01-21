using System;

namespace Domains.DataTransferObjects
{
    public class PhotoListDTO
    {
        public Guid Id { get; set; }
        public DateTime UploadDate { get; set; }

        public string Name { get; set; }
        public string Description { get; set; }

        public string PhotoUrl64 { get; set; }
        public string PhotoUrl256 { get; set; }
    }
}
