import Level from '../model/Level';
import characterServiceInstance from './characterService';
import Character from '../model/Character';
import Mob from '../model/Mob';

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

  calculateExperienceGain(characterLevel: number, mobLevel: number): number {
    const baseExperience = 100;
    const levelDifference = mobLevel - characterLevel;
    let experienceGain = baseExperience * mobLevel;

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
