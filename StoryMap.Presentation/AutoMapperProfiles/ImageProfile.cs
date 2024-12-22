using AutoMapper;
using StoryMap.Domain.Entities;
using StoryMap.Presentation.Models.ImageModels;

namespace StoryMap.Presentation.AutoMapperProfiles;

public class ImageProfile : Profile
{
    public ImageProfile()
    {
        // Entity to Model mappings
        CreateMap<ImageEntity, ImageModel>();
        CreateMap<ImageEntity, ImageCreateModel>();
        CreateMap<ImageEntity, ImageDetailsModel>();
        CreateMap<ImageEntity, ImageEditModel>();

        // Model to Entity mappings
        CreateMap<ImageModel, ImageEntity>();
        CreateMap<ImageCreateModel, ImageEntity>();
        CreateMap<ImageEditModel, ImageEntity>();
    }
} 