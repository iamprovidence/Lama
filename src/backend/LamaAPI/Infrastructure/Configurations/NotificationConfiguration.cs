using Domains.Entities;

using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Configurations
{
	internal sealed class NotificationConfiguration : IEntityTypeConfiguration<Notification>
	{
		public void Configure(EntityTypeBuilder<Notification> builder)
		{
			builder
				.HasKey(n => n.Id);

			builder
				.HasOne(n => n.User)
				.WithMany(u => u.Notifications)
				.HasForeignKey(n => n.UserId)
				.OnDelete(DeleteBehavior.Cascade);
		}
	}
}
