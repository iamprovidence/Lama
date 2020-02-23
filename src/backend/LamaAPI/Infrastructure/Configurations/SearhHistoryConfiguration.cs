using Domains.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Configurations
{
    internal sealed class SearhHistoryConfiguration : IEntityTypeConfiguration<SearchHistory>
    {
        public void Configure(EntityTypeBuilder<SearchHistory> builder)
        {
            builder
              .HasKey(sh => sh.Id);

            builder
                .HasOne(sh => sh.User)
                .WithMany(u => u.Searches)
                .HasForeignKey(sh => sh.UserId)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
