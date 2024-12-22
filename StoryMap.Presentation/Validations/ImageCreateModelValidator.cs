using FluentValidation;
using StoryMap.Presentation.Models.ImageModels;

namespace StoryMap.Presentation.Validations
{
    public class ImageCreateModelValidator : AbstractValidator<ImageCreateModel>
    {
        public ImageCreateModelValidator()
        {
            RuleFor(image => image.Title)
                .NotEmpty().WithMessage("Title is required.");
            RuleFor(image => image.Path)
                .NotEmpty().WithMessage("Path is required.");
        }
    }
} 