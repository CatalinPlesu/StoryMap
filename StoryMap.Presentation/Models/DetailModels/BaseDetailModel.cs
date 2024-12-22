namespace StoryMap.Presentation.Models.DetailModels
{
    public abstract class BaseDetailModel
    {
        public int Id { get; set; }
        public required string TextKey { get; set; }
        public required string TextValue { get; set; }
    }
} 