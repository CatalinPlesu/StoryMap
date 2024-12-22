namespace StoryMap.Presentation.Models.TimeframeModels
{
    public class TimeframeModel : BaseTimeframeModel
    {
        public TimeframeModel()
        {
            CreatedOnUtc = UpdatedOnUtc = DateTime.UtcNow;
        }

        public DateTime? CreatedOnUtc { get; set; }
        public DateTime? UpdatedOnUtc { get; set; }
    }
} 