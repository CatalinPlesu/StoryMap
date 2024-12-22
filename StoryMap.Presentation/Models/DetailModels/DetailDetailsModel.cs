namespace StoryMap.Domain.Models.DetailModels
{
    public class DetailDetailsModel : BaseDetailModel
    {
        public DetailDetailsModel()
        {
            CreatedOnUtc = UpdatedOnUtc = DateTime.UtcNow;
        }

        public DateTime? CreatedOnUtc { get; set; }
        public DateTime? UpdatedOnUtc { get; set; }
    }
} 