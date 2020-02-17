using Domains.Entities;

using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Configurations
{
    internal sealed class PhotoAlbumConfiguration : IEntityTypeConfiguration<PhotoAlbum>
    {
        public void Configure(EntityTypeBuilder<PhotoAlbum> builder)
        {
            builder
                .HasKey(pa => new { pa.AlbumId, pa.PhotoId });

            builder
                .HasOne(pa => pa.Album)
                .WithMany(a => a.PhotoAlbums)
                .HasForeignKey(pa => pa.AlbumId)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
