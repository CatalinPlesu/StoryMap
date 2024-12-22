using StoryMap.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace StoryMap.Domain.Configurations
{
    public class ChapterEntityConfiguration : IEntityTypeConfiguration<ChapterEntity>
    {
        public void Configure(EntityTypeBuilder<ChapterEntity> builder)
        {
            builder.ToTable("Chapters");
            builder.Property(x => x.Title).IsRequired();
            builder.Property(x => x.Order).IsRequired();
        }
    }
} 