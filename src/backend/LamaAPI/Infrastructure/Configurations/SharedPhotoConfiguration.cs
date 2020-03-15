using Domains.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Configurations
{
	internal sealed class SharedPhotoConfiguration : IEntityTypeConfiguration<SharedPhoto>
	{
		public void Configure(EntityTypeBuilder<SharedPhoto> builder)
		{
			builder
				.HasKey(sp => new { sp.PhotoId, sp.SharedWithUserEmail });

			builder
				.HasOne(sp => sp.User)
				.WithMany(u => u.SharedPhotos)
				.HasPrincipalKey(u => u.Email);
		}
	}
}
