namespace StoryMap.Presentation.Models.CharacterModels
{
    public abstract class BaseCharacterModel
    {
        public int Id { get; set; }
        public required string Name { get; set; }
        public string? Description { get; set; }
    }
}
