import mobServiceInstance from '../../src/service/mobService';
import Mob from '../../src/model/Mob';

describe('Mob Service', () => {
  describe('generateRandomNamedMob', () => {
    it('should generate a random named mob with valid properties', () => {
      const mob = mobServiceInstance.generateRandomNamedMob(1, 10);

      expect(mob).toHaveProperty('id', 1);
      expect(mob).toHaveProperty('name');
      expect(mob).toHaveProperty('itemIDs', null);
      expect(mob).toHaveProperty('levelID', 10);
      expect(mob).toHaveProperty('goldDrop.min');
      expect(mob).toHaveProperty('goldDrop.max');
      expect(mob).toHaveProperty('resource.health');
      expect(mob).toHaveProperty('resource.mana');
      expect(mob).toHaveProperty('strength', 10);
      expect(mob).toHaveProperty('dexterity', 10);
      expect(mob).toHaveProperty('intellect', 10);
      expect(mob).toHaveProperty('baseDamage', 10);
      expect(mob).toHaveProperty('armor', 10);
    });
  });

  describe('generateRandomNamedMobs', () => {
    it('should generate an array of 20 random named mobs', () => {
      const mobs = mobServiceInstance.generateRandomNamedMobs();

      expect(Array.isArray(mobs)).toBe(true);
      expect(mobs.length).toBe(20);
      mobs.forEach((mob, index) => {
        expect(mob).toHaveProperty('id', index + 1);
        expect(mob).toHaveProperty('name');
        expect(mob).toHaveProperty('itemIDs', null);
        expect(mob).toHaveProperty('levelID');
        expect(mob).toHaveProperty('goldDrop.min');
        expect(mob).toHaveProperty('goldDrop.max');
        expect(mob).toHaveProperty('resource.health');
        expect(mob).toHaveProperty('resource.mana');
        expect(mob).toHaveProperty('strength');
        expect(mob).toHaveProperty('dexterity');
        expect(mob).toHaveProperty('intellect');
        expect(mob).toHaveProperty('baseDamage');
        expect(mob).toHaveProperty('armor');
      });
    });
  });

  describe('saveGeneratedMobsToDatabase', () => {
    it('should save 20 random named mobs to the database', async () => {
      jest.spyOn(Mob, 'insertMany').mockImplementation(() => Promise.resolve());

      await mobServiceInstance.saveGeneratedMobsToDatabase();

      expect(Mob.insertMany).toHaveBeenCalledTimes(1);
      expect(Mob.insertMany).toHaveBeenCalledWith(expect.any(Array));
      expect(Mob.insertMany.mock.calls[0][0].length).toBe(20);
    });

    it('should log an error if saving mobs fails', async () => {
      const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
      jest.spyOn(Mob, 'insertMany').mockImplementation(() => Promise.reject(new Error('Failed to save mobs')));

      await mobServiceInstance.saveGeneratedMobsToDatabase();

      expect(consoleErrorSpy).toHaveBeenCalledWith('Error generating mobs: Failed to save mobs');
    });
  });

  describe('getRandomMob', () => {
    it('should retrieve a random mob from the database', async () => {
      const mobs = [
        { id: 1, name: 'Mob 1', itemIDs: null, levelID: 1, goldDrop: { min: 1, max: 10 }, resource: { health: 100, mana: 50 }, strength: 1, dexterity: 1, intellect: 1, baseDamage: 1, armor: 1 },
        { id: 2, name: 'Mob 2', itemIDs: null, levelID: 2, goldDrop: { min: 2, max: 20 }, resource: { health: 200, mana: 100 }, strength: 2, dexterity: 2, intellect: 2, baseDamage: 2, armor: 2 },
        { id: 3, name: 'Mob 3', itemIDs: null, levelID: 3, goldDrop: { min: 3, max: 30 }, resource: { health: 300, mana: 150 }, strength: 3, dexterity: 3, intellect: 3, baseDamage: 3, armor: 3 },
      ];
      await Mob.insertMany(mobs);

      const randomMob = await mobServiceInstance.getRandomMob();

      expect(randomMob).toHaveProperty('name');
      expect(randomMob).toHaveProperty('itemIDs', null);
      expect(randomMob).toHaveProperty('levelID');
      expect(randomMob).toHaveProperty('goldDrop.min');
      expect(randomMob).toHaveProperty('goldDrop.max');
      expect(randomMob).toHaveProperty('resource.health');
      expect(randomMob).toHaveProperty('resource.mana');
      expect(randomMob).toHaveProperty('strength');
      expect(randomMob).toHaveProperty('dexterity');
      expect(randomMob).toHaveProperty('intellect');
      expect(randomMob).toHaveProperty('baseDamage');
      expect(randomMob).toHaveProperty('armor');
    });

    it('should throw an error if there is an issue retrieving a random mob', async () => {
      jest.spyOn(Mob, 'countDocuments').mockImplementation(() => Promise.reject(new Error('Failed to count documents')));

      await expect(mobServiceInstance.getRandomMob()).rejects.toThrow('Error retrieving random mob: Failed to count documents');
    });
  });

  describe('getMobById', () => {
    it('should retrieve a mob by id', async () => {
      const mob = new Mob({
        id: 1,
        name: 'Test Mob',
        itemIDs: null,
        levelID: 1,
        goldDrop: { min: 1, max: 10 },
        resource: { health: 100, mana: 50 },
        strength: 1,
        dexterity: 1,
        intellect: 1,
        baseDamage: 1,
        armor: 1,
      });
      await mob.save();

      const retrievedMob = await mobServiceInstance.getMobById(mob._id);

      expect(retrievedMob).toHaveProperty('name', 'Test Mob');
      expect(retrievedMob).toHaveProperty('itemIDs', null);
      expect(retrievedMob).toHaveProperty('levelID', 1);
      expect(retrievedMob).toHaveProperty('goldDrop.min', 1);
      expect(retrievedMob).toHaveProperty('goldDrop.max', 10);
      expect(retrievedMob).toHaveProperty('resource.health', 100);
      expect(retrievedMob).toHaveProperty('resource.mana', 50);
      expect(retrievedMob).toHaveProperty('strength', 1);
      expect(retrievedMob).toHaveProperty('dexterity', 1);
      expect(retrievedMob).toHaveProperty('intellect', 1);
      expect(retrievedMob).toHaveProperty('baseDamage', 1);
      expect(retrievedMob).toHaveProperty('armor', 1);
    });

    it('should throw an error if mob is not found', async () => {
      await expect(mobServiceInstance.getMobById('invalid-id')).rejects.toThrow('Mob not found');
    });
  });
});
