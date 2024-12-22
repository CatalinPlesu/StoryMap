namespace StoryMap.Presentation.Models.MapModels
{
    public abstract class BaseMapModel
    {
        public int Id { get; set; }
        public required string Title { get; set; }
    }
} 