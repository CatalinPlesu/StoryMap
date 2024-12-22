namespace StoryMap.Domain.Models.StoryModels
{
    public class StoryModel : BaseStoryModel
    {
        public StoryModel()
        {
            CreatedOnUtc = UpdatedOnUtc = DateTime.UtcNow;
        }

        public DateTime? CreatedOnUtc { get; set; }
        public DateTime? UpdatedOnUtc { get; set; }
    }
} 