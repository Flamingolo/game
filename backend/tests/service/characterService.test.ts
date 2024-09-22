import characterServiceInstance from '../../src/service/characterService';
import Character from '../../src/model/Character';
import Level from '../../src/model/Level';

describe('Character Service', () => {
  describe('createCharacter', () => {
    it('should create a new character with default values', async () => {
      const levelOne = new Level({ id: 1, expToLevel: 100 });
      await levelOne.save();

      const character = await characterServiceInstance.createCharacter('Test Character');

      expect(character).toHaveProperty('name', 'Test Character');
      expect(character).toHaveProperty('levelId', 1);
      expect(character).toHaveProperty('progress.experience', 0);
      expect(character).toHaveProperty('progress.level', 1);
      expect(character).toHaveProperty('stats.strength', 1);
      expect(character).toHaveProperty('stats.dexterity', 1);
      expect(character).toHaveProperty('stats.intellect', 1);
      expect(character).toHaveProperty('stats.luck', 1);
      expect(character).toHaveProperty('stats.baseDamage', 10);
      expect(character).toHaveProperty('stats.armor', 1);
      expect(character).toHaveProperty('resource.maxHealth', 100);
      expect(character).toHaveProperty('resource.maxMana', 50);
      expect(character).toHaveProperty('resource.currentHealth', 100);
      expect(character).toHaveProperty('resource.currentMana', 50);
      expect(character).toHaveProperty('gold', 0);
      expect(character).toHaveProperty('unspentTalentPoints', 1);
    });

    it('should throw an error if level 1 does not exist', async () => {
      await Level.deleteMany({});

      await expect(characterServiceInstance.createCharacter('Test Character')).rejects.toThrow('Level 1 does not exist. Initialize levels first.');
    });
  });

  describe('getCharacter', () => {
    it('should retrieve a character by id', async () => {
      const levelOne = new Level({ id: 1, expToLevel: 100 });
      await levelOne.save();

      const newCharacter = new Character({
        name: 'Test Character',
        levelId: levelOne.id,
        progress: { experience: 0, level: 1 },
        stats: { strength: 1, dexterity: 1, intellect: 1, luck: 1, baseDamage: 10, armor: 1 },
        gold: 0,
        resource: { maxHealth: 100, maxMana: 50, currentHealth: 100, currentMana: 50 },
        unspentTalentPoints: 1,
      });
      await newCharacter.save();

      const character = await characterServiceInstance.getCharacter(newCharacter.id);

      expect(character).toHaveProperty('name', 'Test Character');
      expect(character).toHaveProperty('levelId', 1);
    });

    it('should throw an error if character is not found', async () => {
      await expect(characterServiceInstance.getCharacter('invalid-id')).rejects.toThrow('Character not found');
    });
  });
});
