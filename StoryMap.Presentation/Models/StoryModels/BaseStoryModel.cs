namespace StoryMap.Domain.Models.StoryModels
{
    public abstract class BaseStoryModel
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
    }
} 