import Level from '../model/Level';

const LEVELS_COUNT = 20;

class LevelService {
  async createPredefinedLevels() {
    const levels = [];

    for (let i = 1; i <= LEVELS_COUNT; i++) {
      levels.push({
        id: i,
        expToLevel: i * 100,
      });
    }

    await Level.insertMany(levels);
    return levels;
  }
}

const levelServiceInstance = new LevelService();
export default levelServiceInstance;
