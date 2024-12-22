namespace StoryMap.Domain.Models.DetailModels
{
    public abstract class BaseDetailModel
    {
        public int Id { get; set; }
        public string TextKey { get; set; }
        public string TextValue { get; set; }
    }
} 