namespace StoryMap.Domain.Models.TimeframeModels
{
    public class TimeframeDetailsModel : BaseTimeframeModel
    {
        public TimeframeDetailsModel()
        {
            CreatedOnUtc = UpdatedOnUtc = DateTime.UtcNow;
        }

        public DateTime? CreatedOnUtc { get; set; }
        public DateTime? UpdatedOnUtc { get; set; }
    }
} 