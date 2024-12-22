using StoryMap.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace StoryMap.Domain.Configurations
{
    public class StoryEntityConfiguration : IEntityTypeConfiguration<StoryEntity>
    {
        public void Configure(EntityTypeBuilder<StoryEntity> builder)
        {
            builder.ToTable("Stories");
            builder.Property(x => x.Title).IsRequired();
            builder.Property(x => x.Description).IsRequired();
        }
    }
} 