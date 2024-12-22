namespace StoryMap.Domain.Models.ImageModels
{
    public abstract class BaseImageModel
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Path { get; set; }
    }
} 