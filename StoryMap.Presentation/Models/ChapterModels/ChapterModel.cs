namespace StoryMap.Presentation.Models.ChapterModels
{
    public class ChapterModel : BaseChapterModel
    {
        public ChapterModel()
        {
            CreatedOnUtc = UpdatedOnUtc = DateTime.UtcNow;
        }

        public DateTime? CreatedOnUtc { get; set; }
        public DateTime? UpdatedOnUtc { get; set; }
    }
} 