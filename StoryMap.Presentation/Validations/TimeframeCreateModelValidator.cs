using FluentValidation;
using StoryMap.Presentation.Models.TimeframeModels;

namespace StoryMap.Presentation.Validations
{
    public class TimeframeCreateModelValidator : AbstractValidator<TimeframeCreateModel>
    {
        public TimeframeCreateModelValidator()
        {
            RuleFor(timeframe => timeframe.Title)
                .NotEmpty().WithMessage("Title is required.");
        }
    }
} 