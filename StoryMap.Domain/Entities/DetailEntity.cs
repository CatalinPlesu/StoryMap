namespace StoryMap.Domain.Entities
{
    public class DetailEntity : BaseEntity
    {
        public int TimeframeId { get; set; }
        public int CharacterId { get; set; }
        public string TextKey { get; set; } = null!;
        public string TextValue { get; set; } = null!;

        // Navigation properties
        public virtual TimeframeEntity Timeframe { get; set; } = null!;
        public virtual CharacterEntity Character { get; set; } = null!;
    }
}
