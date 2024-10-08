import Dungeon from '../model/Dungeon';

class DungeonService {

  generateRandomDungeon(id: number): any {
    const roomAmount = Math.floor(Math.random() * 3) + 3;
    const experience = Math.floor(Math.random() * 191) + 10;
    const minMobLevel = Math.floor(Math.random() * 10) * 3 + 1;
    const maxMobLevel = minMobLevel + 2;

    return {
      name: `Random Dungeon ${id}`,
      roomAmount,
      experience,
      endBossId: null,
      minMobLevel,
      maxMobLevel,
    };
  }

  generateRandomDungeons() {
    const dungeons = Array.from({ length: 5 }, (_, index) => this.generateRandomDungeon(index + 1));
    return dungeons;
  }

  async saveGeneratedDungeonsToDatabase() {
    const dungeons = this.generateRandomDungeons();
    try {
      await Dungeon.insertMany(dungeons);
      console.log('5 random dungeons generated and saved to the database.');
    } catch (error) {
      console.error(`Error generating dungeons: ${error.message}`);
    }
  }

  async getDungeonById(id: string) {
    try {
      const dungeon = await Dungeon.findById(id);
      if (!dungeon) {
        throw new Error('Dungeon not found');
      }
      return dungeon;
    } catch (error) {
      throw new Error(`Error retrieving dungeon: ${error.message}`);
    }
  }
}

const dungeonServiceInstance = new DungeonService();
export default dungeonServiceInstance;
