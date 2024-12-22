using StoryMap.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace StoryMap.Domain.Configurations
{
    public class DetailEntityConfiguration : IEntityTypeConfiguration<DetailEntity>
    {
        public void Configure(EntityTypeBuilder<DetailEntity> builder)
        {
            builder.ToTable("Details");
            builder.Property(x => x.TextKey).IsRequired();
            builder.Property(x => x.TextValue).IsRequired();
        }
    }
} 