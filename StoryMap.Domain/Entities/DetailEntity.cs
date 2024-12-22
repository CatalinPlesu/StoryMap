namespace StoryMap.Domain.Entities
{
    public class DetailEntity : BaseEntity
    {
        public int TimeframeId { get; set; }
        public int CharacterId { get; set; }
        public string TextKey { get; set; }
        public string TextValue { get; set; }

        // Navigation properties
        public virtual TimeframeEntity Timeframe { get; set; }
        public virtual CharacterEntity Character { get; set; }
    }
} 