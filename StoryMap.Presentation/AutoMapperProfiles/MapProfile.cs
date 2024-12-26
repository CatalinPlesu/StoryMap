using AutoMapper;
using StoryMap.Domain.Entities;
using StoryMap.Presentation.Models.MapModels;

namespace StoryMap.Presentation.AutoMapperProfiles;

public class MapProfile : Profile
{
    public MapProfile()
    {
        // Entity to Model mappings
        CreateMap<MapEntity, MapModel>();
        CreateMap<MapEntity, MapCreateModel>();
        CreateMap<MapEntity, MapDetailsModel>();
        CreateMap<MapEntity, MapEditModel>();

        // Model to Entity mappings
        CreateMap<MapModel, MapEntity>();
        CreateMap<MapCreateModel, MapEntity>();
        CreateMap<MapEditModel, MapEntity>();
    }
} 
