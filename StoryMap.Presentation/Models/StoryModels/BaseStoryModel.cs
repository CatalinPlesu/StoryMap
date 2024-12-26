namespace StoryMap.Presentation.Models.StoryModels
{
    public abstract class BaseStoryModel
    {
        public int Id { get; set; }
        public required string Title { get; set; }
        public string? Description { get; set; }
    }
}
