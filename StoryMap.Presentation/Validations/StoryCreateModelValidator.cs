using FluentValidation;
using StoryMap.Presentation.Models.StoryModels;

namespace StoryMap.Presentation.Validations
{
    public class StoryCreateModelValidator : AbstractValidator<StoryCreateModel>
    {
        public StoryCreateModelValidator()
        {
            RuleFor(story => story.Title)
                .NotEmpty().WithMessage("Title is required.");
        }
    }
}
