using FluentValidation;
using StoryMap.Presentation.Models.StoryModels;

namespace StoryMap.Presentation.Validations
{
    public class StoryEditModelValidator : AbstractValidator<StoryEditModel>
    {
        public StoryEditModelValidator()
        {
            RuleFor(story => story.Title)
                .NotEmpty().WithMessage("Title is required.");
        }
    }
}
