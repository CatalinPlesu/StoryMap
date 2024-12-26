using AutoMapper;
using StoryMap.Domain.Entities;
using StoryMap.Presentation.Models.StoryModels;

namespace StoryMap.Presentation.AutoMapperProfiles;

public class StoryProfile : Profile
{
    public StoryProfile()
    {
        // Entity to Model mappings
        CreateMap<StoryEntity, StoryModel>();
        CreateMap<StoryEntity, StoryCreateModel>();
        CreateMap<StoryEntity, StoryDetailsModel>();
        CreateMap<StoryEntity, StoryEditModel>();

        // Model to Entity mappings
        CreateMap<StoryModel, StoryEntity>();
        CreateMap<StoryCreateModel, StoryEntity>()
            .ForMember(dest => dest.Description, opt =>
                opt.MapFrom(src => src.Description ?? string.Empty));
        CreateMap<StoryEditModel, StoryEntity>();
    }
}
