namespace StoryMap.Domain.Models.TimeframeModels
{
    public abstract class BaseTimeframeModel
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public int Order { get; set; }
    }
} 