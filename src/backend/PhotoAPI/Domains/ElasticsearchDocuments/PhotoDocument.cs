using System;

namespace Domains.ElasticsearchDocuments
{
    public class PhotoDocument
    {
        public Guid Id { get; set; } = Guid.NewGuid();
        public string Name { get; set; }
        public string Description { get; set; }
        public bool IsDeleted { get; set; }
        public DateTime UploadDate { get; set; } = DateTime.Now;

        public int UserId { get; set; }

        public string BlobName { get; set; }
        public string Blob64Name { get; set; }
        public string Blob256Name { get; set; }
        public string OriginalBlobName { get; set; }
    }
}
