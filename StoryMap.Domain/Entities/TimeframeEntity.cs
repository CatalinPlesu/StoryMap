namespace StoryMap.Domain.Entities
{
    public class TimeframeEntity : BaseEntity
    {
        public int ChapterId { get; set; }
        public string Title { get; set; }
        public int Order { get; set; }

        // Navigation properties
        public virtual ChapterEntity Chapter { get; set; }
        public virtual ICollection<DetailEntity> Details { get; set; } = new List<DetailEntity>();
    }
} 