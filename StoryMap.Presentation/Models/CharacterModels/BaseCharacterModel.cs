namespace StoryMap.Domain.Models.CharacterModels
{
    public abstract class BaseCharacterModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
    }
} 