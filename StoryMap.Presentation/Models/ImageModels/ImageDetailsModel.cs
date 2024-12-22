namespace StoryMap.Presentation.Models.ImageModels
{
    public class ImageDetailsModel : BaseImageModel
    {
        public ImageDetailsModel()
        {
            CreatedOnUtc = UpdatedOnUtc = DateTime.UtcNow;
        }

        public DateTime? CreatedOnUtc { get; set; }
        public DateTime? UpdatedOnUtc { get; set; }
    }
} 