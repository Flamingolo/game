import encounterServiceInstance from '../../src/service/encounterService';
import Encounter from '../../src/model/Encounter';
import characterServiceInstance from '../../src/service/characterService';
import mobServiceInstance from '../../src/service/mobService';

describe('Encounter Service', () => {
  describe('getEncounterById', () => {
    it('should retrieve an encounter by id', async () => {
      const encounterData = {
        RoomId: 'roomId',
        CharacterId: 'characterId',
        MobId: 'mobId',
        MobRemainingHealth: 100,
        MobRemainingMana: 50,
        CharacterRemainingHealth: 100,
        CharacterRemainingMana: 50,
      };
      const encounter = new Encounter(encounterData);
      await encounter.save();

      const retrievedEncounter = await encounterServiceInstance.getEncounterById(encounter._id);

      expect(retrievedEncounter).toHaveProperty('RoomId', 'roomId');
      expect(retrievedEncounter).toHaveProperty('CharacterId', 'characterId');
      expect(retrievedEncounter).toHaveProperty('MobId', 'mobId');
      expect(retrievedEncounter).toHaveProperty('MobRemainingHealth', 100);
      expect(retrievedEncounter).toHaveProperty('MobRemainingMana', 50);
      expect(retrievedEncounter).toHaveProperty('CharacterRemainingHealth', 100);
      expect(retrievedEncounter).toHaveProperty('CharacterRemainingMana', 50);
    });

    it('should throw an error if encounter is not found', async () => {
      await expect(encounterServiceInstance.getEncounterById('invalid-id')).rejects.toThrow('Encounter not found');
    });
  });

  describe('createEncounter', () => {
    it('should create a new encounter with valid data', async () => {
      const encounterData = {
        RoomId: 'roomId',
        CharacterId: 'characterId',
        MobId: 'mobId',
        MobRemainingHealth: 100,
        MobRemainingMana: 50,
        CharacterRemainingHealth: 100,
        CharacterRemainingMana: 50,
      };

      const encounter = await encounterServiceInstance.createEncounter(encounterData);

      expect(encounter).toHaveProperty('RoomId', 'roomId');
      expect(encounter).toHaveProperty('CharacterId', 'characterId');
      expect(encounter).toHaveProperty('MobId', 'mobId');
      expect(encounter).toHaveProperty('MobRemainingHealth', 100);
      expect(encounter).toHaveProperty('MobRemainingMana', 50);
      expect(encounter).toHaveProperty('CharacterRemainingHealth', 100);
      expect(encounter).toHaveProperty('CharacterRemainingMana', 50);
    });

    it('should throw an error if encounter creation fails', async () => {
      const invalidEncounterData = {
        RoomId: 'roomId',
        CharacterId: 'characterId',
        MobId: 'mobId',
        MobRemainingHealth: 100,
        MobRemainingMana: 50,
        CharacterRemainingHealth: 100,
        CharacterRemainingMana: 50,
      };

      jest.spyOn(Encounter.prototype, 'save').mockImplementationOnce(() => {
        throw new Error('Failed to save encounter');
      });

      await expect(encounterServiceInstance.createEncounter(invalidEncounterData)).rejects.toThrow('Error creating encounter: Failed to save encounter');
    });
  });

  describe('performEncounterAction', () => {
    it('should perform an attack action and update encounter and character', async () => {
      const encounterData = {
        RoomId: 'roomId',
        CharacterId: 'characterId',
        MobId: 'mobId',
        MobRemainingHealth: 100,
        MobRemainingMana: 50,
        CharacterRemainingHealth: 100,
        CharacterRemainingMana: 50,
      };
      const encounter = new Encounter(encounterData);
      await encounter.save();

      const character = {
        _id: 'characterId',
        stats: { baseDamage: 10, strength: 5, armor: 2 },
        resource: { currentHealth: 100, currentMana: 50 },
        save: jest.fn(),
      };
      jest.spyOn(characterServiceInstance, 'getCharacter').mockResolvedValue(character);

      const mob = {
        _id: 'mobId',
        baseDamage: 8,
        strength: 4,
        armor: 1,
      };
      jest.spyOn(mobServiceInstance, 'getMobById').mockResolvedValue(mob);

      const action = { type: 'attack' };
      const result = await encounterServiceInstance.performEncounterAction(encounter._id, action);

      expect(result.encounter).toHaveProperty('MobRemainingHealth', 84);
      expect(result.character.resource).toHaveProperty('currentHealth', 92);
      expect(result).toHaveProperty('characterDamage', 16);
      expect(result).toHaveProperty('mobDamage', 8);
    });

    it('should throw an error if action type is invalid', async () => {
      const encounterData = {
        RoomId: 'roomId',
        CharacterId: 'characterId',
        MobId: 'mobId',
        MobRemainingHealth: 100,
        MobRemainingMana: 50,
        CharacterRemainingHealth: 100,
        CharacterRemainingMana: 50,
      };
      const encounter = new Encounter(encounterData);
      await encounter.save();

      const action = { type: 'invalid-action' };

      await expect(encounterServiceInstance.performEncounterAction(encounter._id, action)).rejects.toThrow('Invalid action type');
    });

    it('should throw an error if character is dead', async () => {
      const encounterData = {
        RoomId: 'roomId',
        CharacterId: 'characterId',
        MobId: 'mobId',
        MobRemainingHealth: 100,
        MobRemainingMana: 50,
        CharacterRemainingHealth: 0,
        CharacterRemainingMana: 50,
      };
      const encounter = new Encounter(encounterData);
      await encounter.save();

      const action = { type: 'attack' };

      await expect(encounterServiceInstance.performEncounterAction(encounter._id, action)).rejects.toThrow('Character is dead');
    });

    it('should throw an error if mob is dead', async () => {
      const encounterData = {
        RoomId: 'roomId',
        CharacterId: 'characterId',
        MobId: 'mobId',
        MobRemainingHealth: 0,
        MobRemainingMana: 50,
        CharacterRemainingHealth: 100,
        CharacterRemainingMana: 50,
      };
      const encounter = new Encounter(encounterData);
      await encounter.save();

      const action = { type: 'attack' };

      await expect(encounterServiceInstance.performEncounterAction(encounter._id, action)).rejects.toThrow('Mob is dead');
    });
  });
});
