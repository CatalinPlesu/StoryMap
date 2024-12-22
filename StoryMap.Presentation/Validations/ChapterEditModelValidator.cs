using FluentValidation;
using StoryMap.Presentation.Models.ChapterModels;

namespace StoryMap.Presentation.Validations
{
    public class ChapterEditModelValidator : AbstractValidator<ChapterEditModel>
    {
        public ChapterEditModelValidator()
        {
            RuleFor(chapter => chapter.Title)
                .NotEmpty().WithMessage("Title is required.");
        }
    }
} 