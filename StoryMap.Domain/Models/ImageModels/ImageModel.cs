namespace StoryMap.Domain.Models.ImageModels
{
    public class ImageModel : BaseImageModel
    {
        public ImageModel()
        {
            CreatedOnUtc = UpdatedOnUtc = DateTime.UtcNow;
        }

        public DateTime? CreatedOnUtc { get; set; }
        public DateTime? UpdatedOnUtc { get; set; }
    }
} 