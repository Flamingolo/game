import Level from '../model/Level';

const LEVELS_COUNT = 20;
const BASE_EXPERIENCE = 100;

class LevelService {
  async createPredefinedLevels() {
    const levels = [];

    for (let i = 1; i <= LEVELS_COUNT; i++) {
      levels.push({
        id: i,
        expToLevel: i * BASE_EXPERIENCE,
      });
    }

    await Level.insertMany(levels);
    return levels;
  }

  calculateExperienceGain(characterLevel: number, mobLevel: number): number {
    const levelDifference = mobLevel - characterLevel;
    let experienceGain = BASE_EXPERIENCE * mobLevel;

    if (levelDifference > 0) {
      experienceGain *= 1 + (levelDifference * 0.2);
    } else if (levelDifference < 0) {
      experienceGain *= 1 + (levelDifference * 0.1);
    }

    return Math.max(0, experienceGain);
  }

}

const levelServiceInstance = new LevelService();
export default levelServiceInstance;
