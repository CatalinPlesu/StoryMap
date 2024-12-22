namespace StoryMap.Domain.Models.CharacterModels
{
    public class CharacterModel : BaseCharacterModel
    {
        public CharacterModel()
        {
            CreatedOnUtc = UpdatedOnUtc = DateTime.UtcNow;
        }

        public DateTime? CreatedOnUtc { get; set; }
        public DateTime? UpdatedOnUtc { get; set; }
    }
} 