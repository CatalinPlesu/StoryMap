using Microsoft.EntityFrameworkCore;
using StoryMap.Domain.Entities;
using StoryMap.Domain.Configurations;

namespace StoryMap.Domain.Persistence
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        // DbSet properties for each entity
        public DbSet<StoryEntity> StoryEntities { get; set; }
        public DbSet<ChapterEntity> ChapterEntities { get; set; }
        public DbSet<CharacterEntity> CharacterEntities { get; set; }
        public DbSet<DetailEntity> DetailEntities { get; set; }
        public DbSet<ImageEntity> ImageEntities { get; set; }
        public DbSet<MapEntity> MapEntities { get; set; }
        public DbSet<TimeframeEntity> TimeframeEntities { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            // Apply configurations for each entity
            builder.ApplyConfiguration(new StoryEntityConfiguration());
            builder.ApplyConfiguration(new ChapterEntityConfiguration());
            builder.ApplyConfiguration(new CharacterEntityConfiguration());
            builder.ApplyConfiguration(new DetailEntityConfiguration());
            builder.ApplyConfiguration(new ImageEntityConfiguration());
            builder.ApplyConfiguration(new MapEntityConfiguration());
            builder.ApplyConfiguration(new TimeframeEntityConfiguration());

            base.OnModelCreating(builder);
        }
    }
} 