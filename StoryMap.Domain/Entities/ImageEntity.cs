namespace StoryMap.Domain.Entities
{
    public class ImageEntity : BaseEntity
    {
        public int MapId { get; set; }
        public string Title { get; set; }
        public string Path { get; set; }
        public float X { get; set; }
        public float Y { get; set; }
        public float Scale { get; set; }
        public float Rotation { get; set; }

        // Navigation property
        public virtual MapEntity Map { get; set; }
    }
} 