using AutoMapper;
using StoryMap.Domain.Entities;
using StoryMap.Presentation.Models.CharacterModels;

namespace StoryMap.Presentation.AutoMapperProfiles;

public class CharacterProfile : Profile
{
    public CharacterProfile()
    {
        // Entity to Model mappings
        CreateMap<CharacterEntity, CharacterModel>();
        CreateMap<CharacterEntity, CharacterDetailsModel>();
        CreateMap<CharacterEntity, CharacterCreateModel>();
        CreateMap<CharacterEntity, CharacterEditModel>();

        // Model to Entity mappings
        CreateMap<CharacterModel, CharacterEntity>();
        CreateMap<CharacterCreateModel, CharacterEntity>()
            .ForMember(dest => dest.Description, opt =>
                opt.MapFrom(src => src.Description ?? string.Empty));
        CreateMap<CharacterEditModel, CharacterEntity>();
    }
} 
