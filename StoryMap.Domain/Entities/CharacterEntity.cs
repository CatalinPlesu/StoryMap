namespace StoryMap.Domain.Entities
{
    public class CharacterEntity : BaseEntity
    {
        public int StoryId { get; set; }
        public string Name { get; set; } = null!;
        public string Description { get; set; } = null!;

        // Navigation property
        public virtual StoryEntity Story { get; set; } = null!;
    }
}
