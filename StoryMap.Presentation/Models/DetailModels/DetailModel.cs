namespace StoryMap.Presentation.Models.DetailModels
{
    public class DetailModel : BaseDetailModel
    {
        public DetailModel()
        {
            CreatedOnUtc = UpdatedOnUtc = DateTime.UtcNow;
        }

        public DateTime? CreatedOnUtc { get; set; }
        public DateTime? UpdatedOnUtc { get; set; }
    }
} 