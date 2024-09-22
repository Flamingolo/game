import Mob from '../model/Mob';

const lowLevelMobNames = [
  'Goblin', 'Goblin Scout', 'Goblin Shaman', 'Goblin Grunt', 'Hobgoblin',
  'Kobold', 'Goblin Berserker', 'Cave Bat', 'Spider', 'Goblin Chieftain'
];

const midLevelMobNames = [
  'Ogre', 'Troll', 'Giant Rat'
];

const generateRandomNamedMob = (id: number, levelID: number): any => {
  const mobNames = levelID <= 15 ? lowLevelMobNames : midLevelMobNames;
  const randomName = mobNames[Math.floor(Math.random() * mobNames.length)];

  return {
    id,
    name: randomName,
    itemIDs: null,
    levelID,
    goldDrop: {
      min: Math.floor(Math.random() * 10),
      max: Math.floor(Math.random() * 20)
    },
    resource: {
      health: Math.floor(Math.random() * 100) + 50,
      mana: Math.floor(Math.random() * 50) + 20
    }
  };
};

const generateRandomNamedMobs = () => {
  const mobs = [];
  for (let i = 1; i <= 20; i++) {
    const levelID = i <= 10 ? Math.floor(Math.random() * 15) + 1 : Math.floor(Math.random() * 5) + 15;
    mobs.push(generateRandomNamedMob(i, levelID));
  }
  return mobs;
};

const saveGeneratedMobsToDatabase = async () => {
  const mobs = generateRandomNamedMobs();
  try {
    await Mob.insertMany(mobs);
    console.log('20 random named mobs generated and saved to the database.');
  } catch (error) {
    console.error(`Error generating mobs: ${error.message}`);
  }
};

export { generateRandomNamedMobs, saveGeneratedMobsToDatabase };
