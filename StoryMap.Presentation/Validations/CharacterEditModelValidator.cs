using FluentValidation;
using StoryMap.Presentation.Models.CharacterModels;

namespace StoryMap.Presentation.Validations
{
    public class CharacterEditModelValidator : AbstractValidator<CharacterEditModel>
    {
        public CharacterEditModelValidator()
        {
            RuleFor(character => character.Name)
                .NotEmpty().WithMessage("Name is required.");
        }
    }
} 
