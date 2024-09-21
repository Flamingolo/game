import Character from '../model/Character';
import Level from '../model/Level';

export const createCharacter = async (name: string) => {
  const levelOne = await Level.findOne({ id: 1 });
  if (!levelOne) {
    throw new Error('Level 1 does not exist. Initialize levels first.');
  }

  const defaultStats = {
    strength: 1,
    dexterity: 1,
    intellect: 1,
    luck: 1,
  };

  const defaultProgress = {
    experience: 0,
    level: 1,
  };

  const newCharacter = new Character({
    id: Date.now(),
    name: name,
    levelId: levelOne.id,
    progress: defaultProgress,
    stats: defaultStats,
    gold: 0,
  });

  await newCharacter.save();

  return newCharacter;
};

export const getCharacter = async (id: string) => {
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
