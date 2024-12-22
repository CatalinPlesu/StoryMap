using StoryMap.Domain.Entities;
using StoryMap.Domain.Interfaces;
using StoryMap.Services.Interfaces;

namespace StoryMap.Services.Services;

public class CharacterService : ICharacterService
{
    private readonly ICharacterRepository _repository;

    public CharacterService(ICharacterRepository repository)
    {
        _repository = repository;
    }

    public async Task<CharacterEntity> GetById(int id)
    {
        return await _repository.GetById(id);
    }

    public async Task<IEnumerable<CharacterEntity>> GetAll()
    {
        return await _repository.GetAll();
    }

    public async Task Create(CharacterEntity entity)
    {
        await _repository.Create(entity);
    }

    public async Task Update(CharacterEntity entity)
    {
        await _repository.Update(entity);
    }

    public async Task Delete(int id)
    {
        await _repository.Delete(id);
    }
} 