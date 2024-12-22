using StoryMap.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace StoryMap.Domain.Configurations
{
    public class TimeframeEntityConfiguration : IEntityTypeConfiguration<TimeframeEntity>
    {
        public void Configure(EntityTypeBuilder<TimeframeEntity> builder)
        {
            builder.ToTable("Timeframes");
            builder.Property(x => x.Title).IsRequired();
            builder.Property(x => x.Order).IsRequired();
        }
    }
} 