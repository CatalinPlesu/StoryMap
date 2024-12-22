namespace StoryMap.Presentation.Models.TimeframeModels
{
    public abstract class BaseTimeframeModel
    {
        public int Id { get; set; }
        public required string Title { get; set; }
        public int Order { get; set; }
    }
} 