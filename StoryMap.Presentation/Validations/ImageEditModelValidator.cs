using FluentValidation;
using StoryMap.Presentation.Models.ImageModels;

namespace StoryMap.Presentation.Validations
{
    public class ImageEditModelValidator : AbstractValidator<ImageEditModel>
    {
        public ImageEditModelValidator()
        {
            RuleFor(image => image.Title)
                .NotEmpty().WithMessage("Title is required.");
        }
    }
} 