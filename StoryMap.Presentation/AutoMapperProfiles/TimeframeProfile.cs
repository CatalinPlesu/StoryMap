using AutoMapper;
using StoryMap.Domain.Entities;
using StoryMap.Presentation.Models.TimeframeModels;

public class TimeframeProfile : Profile
{
    public TimeframeProfile()
    {
        // Entity to Model mappings
        CreateMap<TimeframeEntity, TimeframeModel>();
        CreateMap<TimeframeEntity, TimeframeCreateModel>();
        CreateMap<TimeframeEntity, TimeframeEditModel>();
        CreateMap<TimeframeEntity, TimeframeDetailsModel>();

        // Model to Entity mappings
        CreateMap<TimeframeModel, TimeframeEntity>();
        CreateMap<TimeframeCreateModel, TimeframeEntity>();
        CreateMap<TimeframeEditModel, TimeframeEntity>();
    }
} 