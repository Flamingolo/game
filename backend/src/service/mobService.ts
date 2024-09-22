import { ObjectId } from 'mongodb';
import Mob from '../model/Mob';
import mongoose from 'mongoose';

const lowLevelMobNames = [
  'Goblin', 'Goblin Scout', 'Goblin Shaman', 'Goblin Grunt', 'Hobgoblin',
  'Kobold', 'Goblin Berserker', 'Cave Bat', 'Spider', 'Goblin Chieftain'
];

const midLevelMobNames = [
  'Ogre', 'Troll', 'Giant Rat'
];

class MobService {
  generateRandomNamedMob(id: number, levelID: number): any {
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
      },
      strength: levelID * 1,
      dexterity: levelID * 1,
      intellect: levelID * 1,
      baseDamage: levelID * 1,
      armor: levelID * 1
    };
  }

  generateRandomNamedMobs() {
    const mobs = [];
    for (let i = 1; i <= 20; i++) {
      const levelID = i <= 10 ? Math.floor(Math.random() * 15) + 1 : Math.floor(Math.random() * 5) + 15;
      mobs.push(this.generateRandomNamedMob(i, levelID));
    }
    return mobs;
  }

  async saveGeneratedMobsToDatabase() {
    const mobs = this.generateRandomNamedMobs();
    try {
      await Mob.insertMany(mobs);
      console.log('20 random named mobs generated and saved to the database.');
    } catch (error) {
      console.error(`Error generating mobs: ${error.message}`);
    }
  }

  async getRandomMob() {
    try {
      const count = await Mob.countDocuments();
      const random = Math.floor(Math.random() * count);
      const mob = await Mob.findOne().skip(random);
      return mob;
    } catch (error) {
      console.error(`Error retrieving random mob: ${error.message}`);
      throw error;
    }
  }

  async getMobById(id: string) {
    try {
      const mob = await Mob.findById(id);
      if (!mob) {
        throw new Error('Mob not found');
      }
      return mob;
    } catch (error) {
      console.error(`Error retrieving mob by ID: ${error.message}`);
      throw error;
    }
  }
}

const mobServiceInstance = new MobService();
export default mobServiceInstance;
