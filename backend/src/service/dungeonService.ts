import Dungeon from '../model/Dungeon';

const generateRandomDungeon = (id: number): any => {
  const roomAmount = Math.floor(Math.random() * 3) + 3;
  const experience = Math.floor(Math.random() * 191) + 10;

  return {
    name: `Random Dungeon ${id}`,
    roomAmount,
    experience,
    endBossId: null,
  };
};

const generateRandomDungeons = () => {
  const dungeons = Array.from({ length: 5 }, (_, index) => generateRandomDungeon(index + 1));
  return dungeons;
};

const saveGeneratedDungeonsToDatabase = async () => {
  const dungeons = generateRandomDungeons();
  try {
    await Dungeon.insertMany(dungeons);
    console.log('5 random dungeons generated and saved to the database.');
  } catch (error) {
    console.error(`Error generating dungeons: ${error.message}`);
  }
};

export { generateRandomDungeons, saveGeneratedDungeonsToDatabase };
