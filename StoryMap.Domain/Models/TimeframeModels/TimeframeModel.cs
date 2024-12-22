namespace StoryMap.Domain.Models.TimeframeModels
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