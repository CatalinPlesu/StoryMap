using AutoMapper;
using StoryMap.Domain.Entities;
using StoryMap.Presentation.Models.DetailModels;

namespace StoryMap.Presentation.AutoMapperProfiles;

public class DetailProfile : Profile
{
    public DetailProfile()
    {
        // Entity to Model mappings
        CreateMap<DetailEntity, DetailModel>();
        CreateMap<DetailEntity, DetailDetailsModel>();
        CreateMap<DetailEntity, DetailCreateModel>();
        CreateMap<DetailEntity, DetailEditModel>();

        // Model to Entity mappings
        CreateMap<DetailModel, DetailEntity>();
        CreateMap<DetailCreateModel, DetailEntity>();
        CreateMap<DetailEditModel, DetailEntity>();
    }
} 