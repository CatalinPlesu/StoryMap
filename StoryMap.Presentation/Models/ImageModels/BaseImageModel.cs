namespace StoryMap.Presentation.Models.ImageModels
{
    public abstract class BaseImageModel
    {
        public int Id { get; set; }
        public required string Title { get; set; }
        public required string Path { get; set; }
    }
} 