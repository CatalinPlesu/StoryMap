using Microsoft.EntityFrameworkCore;
using StoryMap.Domain.Configurations;
using StoryMap.Domain.Entities;

namespace StoryMap.Domain.Persistence
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options) { }

        // DbSet properties for each entity
        public DbSet<StoryEntity> Stories { get; set; }
        public DbSet<ChapterEntity> Chapters { get; set; }
        public DbSet<CharacterEntity> Characters { get; set; }
        public DbSet<DetailEntity> Details { get; set; }
        public DbSet<ImageEntity> Images { get; set; }
        public DbSet<MapEntity> Maps { get; set; }
        public DbSet<TimeframeEntity> Timeframes { get; set; }

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
