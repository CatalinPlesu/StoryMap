using FluentValidation;
using StoryMap.Presentation.Models.MapModels;

namespace StoryMap.Presentation.Validations
{
    public class MapCreateModelValidator : AbstractValidator<MapCreateModel>
    {
        public MapCreateModelValidator()
        {
            RuleFor(map => map.Title)
                .NotEmpty().WithMessage("Title is required.");
        }
    }
} 