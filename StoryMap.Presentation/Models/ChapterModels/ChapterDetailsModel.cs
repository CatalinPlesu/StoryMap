namespace StoryMap.Presentation.Models.ChapterModels
{
    public class ChapterDetailsModel : BaseChapterModel
    {
        public ChapterDetailsModel()
        {
            CreatedOnUtc = UpdatedOnUtc = DateTime.UtcNow;
        }

        public DateTime? CreatedOnUtc { get; set; }
        public DateTime? UpdatedOnUtc { get; set; }
    }
} 