using FluentValidation;
using StoryMap.Presentation.Models.TimeframeModels;

namespace StoryMap.Presentation.Validations
{
    public class TimeframeEditModelValidator : AbstractValidator<TimeframeEditModel>
    {
        public TimeframeEditModelValidator()
        {
            RuleFor(timeframe => timeframe.Title)
                .NotEmpty().WithMessage("Title is required.");
        }
    }
} 