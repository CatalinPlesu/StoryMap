using StoryMap.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace StoryMap.Domain.Configurations
{
    public class MapEntityConfiguration : IEntityTypeConfiguration<MapEntity>
    {
        public void Configure(EntityTypeBuilder<MapEntity> builder)
        {
            builder.ToTable("Maps");
            builder.Property(x => x.Title).IsRequired();
        }
    }
} 