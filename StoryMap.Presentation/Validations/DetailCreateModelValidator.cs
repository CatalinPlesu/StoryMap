using FluentValidation;
using StoryMap.Presentation.Models.DetailModels;

namespace StoryMap.Presentation.Validations
{
    public class DetailCreateModelValidator : AbstractValidator<DetailCreateModel>
    {
        public DetailCreateModelValidator()
        {
            RuleFor(detail => detail.TextKey)
                .NotEmpty().WithMessage("Text key is required.");
            RuleFor(detail => detail.TextValue)
                .NotEmpty().WithMessage("Text value is required.");
        }
    }
} 