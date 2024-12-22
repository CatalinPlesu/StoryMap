namespace StoryMap.Domain.Entities
{
    public class CharacterEntity : BaseEntity
    {
        public int StoryId { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }

        // Navigation property
        public virtual StoryEntity Story { get; set; }
    }
} 