import levelServiceInstance from '../../src/service/levelService';
import Level from '../../src/model/Level';

describe('Level Service', () => {
  describe('createPredefinedLevels', () => {
    it('should create 20 predefined levels with correct properties', async () => {
      const levels = await levelServiceInstance.createPredefinedLevels();

      expect(levels).toHaveLength(20);
      levels.forEach((level, index) => {
        expect(level).toHaveProperty('id', index + 1);
        expect(level).toHaveProperty('expToLevel', (index + 1) * 100);
      });
    });

    it('should save the predefined levels to the database', async () => {
      await levelServiceInstance.createPredefinedLevels();

      const savedLevels = await Level.find();
      expect(savedLevels).toHaveLength(20);
      savedLevels.forEach((level, index) => {
        expect(level).toHaveProperty('id', index + 1);
        expect(level).toHaveProperty('expToLevel', (index + 1) * 100);
      });
    });

    it('should not create duplicate levels if called multiple times', async () => {
      await levelServiceInstance.createPredefinedLevels();
      await levelServiceInstance.createPredefinedLevels();

      const savedLevels = await Level.find();
      expect(savedLevels).toHaveLength(20);
    });
  });
});
