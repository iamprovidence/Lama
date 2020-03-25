using Domains.Entities;

using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Configurations
{
	internal sealed class UserConfiguration : IEntityTypeConfiguration<User>
	{
		public void Configure(EntityTypeBuilder<User> builder)
		{
			builder
				.HasKey(u => u.Id);

			builder
				.Property(u => u.Id)
				.ValueGeneratedNever();

			builder
				.HasMany(u => u.Comments)
				.WithOne(c => c.User)
				.HasForeignKey(c => c.UserId)
				.OnDelete(DeleteBehavior.Cascade);

			builder
				.HasMany(u => u.Albums)
				.WithOne(a => a.User)
				.HasForeignKey(a => a.UserId)
				.OnDelete(DeleteBehavior.Cascade);

			builder
				.HasMany(u => u.Searches)
				.WithOne(sh => sh.User)
				.HasForeignKey(sh => sh.UserId)
				.OnDelete(DeleteBehavior.Cascade);

			builder
				.HasMany(u => u.SharedPhotos)
				.WithOne(sp => sp.User)
				.HasPrincipalKey(u => u.Email);

			builder
				.HasMany(u => u.Notifications)
				.WithOne(n => n.User)
				.HasForeignKey(n => n.UserId)
				.OnDelete(DeleteBehavior.Cascade);
		}
	}
}
