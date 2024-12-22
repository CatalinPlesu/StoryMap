namespace StoryMap.Presentation.Models.MapModels
{
    public class MapDetailsModel : BaseMapModel
    {
        public MapDetailsModel()
        {
            CreatedOnUtc = UpdatedOnUtc = DateTime.UtcNow;
        }

        public DateTime? CreatedOnUtc { get; set; }
        public DateTime? UpdatedOnUtc { get; set; }
    }
} 