import dungeonServiceInstance from '../../src/service/dungeonService';
import Dungeon from '../../src/model/Dungeon';

describe('Dungeon Service', () => {
  describe('generateRandomDungeon', () => {
    it('should generate a random dungeon with valid properties', () => {
      const dungeon = dungeonServiceInstance.generateRandomDungeon(1);

      expect(dungeon).toHaveProperty('name', 'Random Dungeon 1');
      expect(dungeon).toHaveProperty('roomAmount');
      expect(dungeon.roomAmount).toBeGreaterThanOrEqual(3);
      expect(dungeon.roomAmount).toBeLessThanOrEqual(5);
      expect(dungeon).toHaveProperty('experience');
      expect(dungeon.experience).toBeGreaterThanOrEqual(10);
      expect(dungeon.experience).toBeLessThanOrEqual(200);
      expect(dungeon).toHaveProperty('endBossId', null);
    });
  });

  describe('generateRandomDungeons', () => {
    it('should generate an array of 5 random dungeons', () => {
      const dungeons = dungeonServiceInstance.generateRandomDungeons();

      expect(Array.isArray(dungeons)).toBe(true);
      expect(dungeons.length).toBe(5);
      dungeons.forEach((dungeon, index) => {
        expect(dungeon).toHaveProperty('name', `Random Dungeon ${index + 1}`);
        expect(dungeon).toHaveProperty('roomAmount');
        expect(dungeon.roomAmount).toBeGreaterThanOrEqual(3);
        expect(dungeon.roomAmount).toBeLessThanOrEqual(5);
        expect(dungeon).toHaveProperty('experience');
        expect(dungeon.experience).toBeGreaterThanOrEqual(10);
        expect(dungeon.experience).toBeLessThanOrEqual(200);
        expect(dungeon).toHaveProperty('endBossId', null);
      });
    });
  });

  describe('saveGeneratedDungeonsToDatabase', () => {
    it('should save 5 random dungeons to the database', async () => {
      jest.spyOn(Dungeon, 'insertMany').mockImplementation(() => Promise.resolve());

      await dungeonServiceInstance.saveGeneratedDungeonsToDatabase();

      expect(Dungeon.insertMany).toHaveBeenCalledTimes(1);
      expect(Dungeon.insertMany).toHaveBeenCalledWith(expect.any(Array));
      expect(Dungeon.insertMany.mock.calls[0][0].length).toBe(5);
    });

    it('should log an error if saving dungeons fails', async () => {
      const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
      jest.spyOn(Dungeon, 'insertMany').mockImplementation(() => Promise.reject(new Error('Failed to save dungeons')));

      await dungeonServiceInstance.saveGeneratedDungeonsToDatabase();

      expect(consoleErrorSpy).toHaveBeenCalledWith('Error generating dungeons: Failed to save dungeons');
    });
  });

  describe('getDungeonById', () => {
    it('should retrieve a dungeon by id', async () => {
      const dungeon = new Dungeon({
        name: 'Test Dungeon',
        roomAmount: 3,
        experience: 50,
        endBossId: null,
      });
      await dungeon.save();

      const retrievedDungeon = await dungeonServiceInstance.getDungeonById(dungeon._id);

      expect(retrievedDungeon).toHaveProperty('name', 'Test Dungeon');
      expect(retrievedDungeon).toHaveProperty('roomAmount', 3);
      expect(retrievedDungeon).toHaveProperty('experience', 50);
      expect(retrievedDungeon).toHaveProperty('endBossId', null);
    });

    it('should throw an error if dungeon is not found', async () => {
      await expect(dungeonServiceInstance.getDungeonById('invalid-id')).rejects.toThrow('Dungeon not found');
    });
  });
});
