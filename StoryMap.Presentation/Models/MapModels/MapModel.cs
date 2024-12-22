namespace StoryMap.Presentation.Models.MapModels
{
    public class MapModel : BaseMapModel
    {
        public MapModel()
        {
            CreatedOnUtc = UpdatedOnUtc = DateTime.UtcNow;
        }

        public DateTime? CreatedOnUtc { get; set; }
        public DateTime? UpdatedOnUtc { get; set; }
    }
} 