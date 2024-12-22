namespace StoryMap.Domain.Models.StoryModels
{
    public class StoryDetailsModel : BaseStoryModel
    {
        public StoryDetailsModel()
        {
            CreatedOnUtc = UpdatedOnUtc = DateTime.UtcNow;
        }

        public DateTime? CreatedOnUtc { get; set; }
        public DateTime? UpdatedOnUtc { get; set; }
    }
} 