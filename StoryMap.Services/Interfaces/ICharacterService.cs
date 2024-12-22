using StoryMap.Domain.Entities;

namespace StoryMap.Services.Interfaces;

public interface ICharacterService
{
    Task<CharacterEntity> GetById(int id);
    Task<IEnumerable<CharacterEntity>> GetAll();
    Task Create(CharacterEntity entity);
    Task Update(CharacterEntity entity);
    Task Delete(int id);
} 