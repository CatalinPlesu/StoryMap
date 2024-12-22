namespace StoryMap.Presentation.Models.ChapterModels
{
    public abstract class BaseChapterModel
    {
        public int Id { get; set; }
        public required string Title { get; set; }
        public int Order { get; set; }
    }
} 