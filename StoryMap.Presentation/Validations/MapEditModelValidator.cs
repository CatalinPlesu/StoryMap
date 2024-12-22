using FluentValidation;
using StoryMap.Presentation.Models.MapModels;

namespace StoryMap.Presentation.Validations
{
    public class MapEditModelValidator : AbstractValidator<MapEditModel>
    {
        public MapEditModelValidator()
        {
            RuleFor(map => map.Title)
                .NotEmpty().WithMessage("Title is required.");
        }
    }
} 