namespace StoryMap.Presentation.Models.CharacterModels
{
    public class CharacterDetailsModel : BaseCharacterModel
    {
        public CharacterDetailsModel()
        {
            CreatedOnUtc = UpdatedOnUtc = DateTime.UtcNow;
        }

        public DateTime? CreatedOnUtc { get; set; }
        public DateTime? UpdatedOnUtc { get; set; }
    }
} 