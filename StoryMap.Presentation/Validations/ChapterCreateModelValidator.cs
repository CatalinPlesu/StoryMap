using FluentValidation;
using StoryMap.Presentation.Models.ChapterModels;

namespace StoryMap.Presentation.Validations
{
    public class ChapterCreateModelValidator : AbstractValidator<ChapterCreateModel>
    {
        public ChapterCreateModelValidator()
        {
            RuleFor(chapter => chapter.Title)
                .NotEmpty().WithMessage("Title is required.");
        }
    }
} 