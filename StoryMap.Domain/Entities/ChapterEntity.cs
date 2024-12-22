namespace StoryMap.Domain.Entities
{
    public class ChapterEntity : BaseEntity
    {
        public int StoryId { get; set; }
        public string Title { get; set; } = null!;
        public int Order { get; set; }

        // Navigation property
        public virtual StoryEntity Story { get; set; } = null!;
    }
}
