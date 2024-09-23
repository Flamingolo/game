import Character from '../model/Character';
import Level from '../model/Level';

class CharacterService {

  async createCharacter(name: string) {
    const levelOne = await Level.findOne({ id: 1 });
    if (!levelOne) {
      throw new Error('Level 1 does not exist. Initialize levels first.');
    }

    const defaultStats = {
      strength: 1,
      dexterity: 1,
      intellect: 1,
      luck: 1,
      baseDamage: 10,
      armor: 1,
    };

    const defaultProgress = {
      experience: 0,
      level: 1,
    };

    const defaultResource = {
      maxHealth: 100,
      maxMana: 50,
      currentHealth: 100,
      currentMana: 50,
    };

    const newCharacter = new Character({
      name: name,
      levelId: levelOne.id,
      progress: defaultProgress,
      stats: defaultStats,
      gold: 0,
      resource: defaultResource,
      unspentTalentPoints: 1,
    });

    await newCharacter.save();

    return newCharacter;
  };

  async getCharacter(id: string) {
    try {
      const character = await Character.findById(id).populate('levelId');
      if (!character) {
        throw new Error('Character not found');
      }
      return character;
    } catch (error) {
      throw new Error(`Error retrieving character: ${error.message}`);
    }
  };

  async regenerateResources() {
    try {
      await Character.updateMany(
        { 'resource.currentHealth': { $lt: 100 }, 'resource.currentMana': { $lt: 50 } },
        [
          {
            $set: {
              'resource.currentHealth': {
                $min: [{ $add: ['$resource.currentHealth', 1] }, '$resource.maxHealth']
              },
              'resource.currentMana': {
                $min: [{ $add: ['$resource.currentMana', 1] }, '$resource.maxMana']
              }
            }
          }
        ]
      );
    } catch (error) {
      throw new Error(`Error regenerating resources: ${error.message}`);
    }
  }
}

const characterServiceInstance = new CharacterService();
export default characterServiceInstance;
