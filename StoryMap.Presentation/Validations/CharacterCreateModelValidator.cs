using FluentValidation;
using StoryMap.Presentation.Models.CharacterModels;

namespace StoryMap.Presentation.Validations
{
    public class CharacterCreateModelValidator : AbstractValidator<CharacterCreateModel>
    {
        public CharacterCreateModelValidator()
        {
            RuleFor(character => character.Name)
                .NotEmpty().WithMessage("Name is required.");
            RuleFor(character => character.Description)
                .NotEmpty().WithMessage("Description is required.");
        }
    }
} 