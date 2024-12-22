namespace StoryMap.Domain.Entities
{
    public class StoryEntity : BaseEntity
    {
        public string Title { get; set; } = null!;
        public string Description { get; set; } = null!;

        // Navigation properties
        public virtual ICollection<ChapterEntity> Chapters { get; set; } =
            new List<ChapterEntity>();
        public virtual ICollection<CharacterEntity> Characters { get; set; } =
            new List<CharacterEntity>();
        public virtual ICollection<MapEntity> Maps { get; set; } = new List<MapEntity>();
    }
}
