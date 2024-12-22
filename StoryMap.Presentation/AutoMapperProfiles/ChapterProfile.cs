using AutoMapper;
using StoryMap.Domain.Entities;
using StoryMap.Presentation.Models.ChapterModels;

namespace StoryMap.Presentation.AutoMapperProfiles;

public class ChapterProfile : Profile
{
    public ChapterProfile()
    {
        // Entity to Model mappings
        CreateMap<ChapterEntity, ChapterModel>();
        CreateMap<ChapterEntity, ChapterDetailsModel>();
        CreateMap<ChapterEntity, ChapterCreateModel>();
        CreateMap<ChapterEntity, ChapterEditModel>();

        // Model to Entity mappings
        CreateMap<ChapterModel, ChapterEntity>();
        CreateMap<ChapterCreateModel, ChapterEntity>();
        CreateMap<ChapterEditModel, ChapterEntity>();
    }
} 