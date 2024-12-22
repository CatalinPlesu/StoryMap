using StoryMap.Domain.Entities;
using StoryMap.Domain.Interfaces;
using StoryMap.Domain.Persistence;

namespace StoryMap.Domain.Repositories;

public class CharacterRepository : Repository<CharacterEntity>, ICharacterRepository
{
    public CharacterRepository(ApplicationDbContext context) : base(context)
    {
    }
    
    // Implement additional methods specific to CharacterEntity here
} 