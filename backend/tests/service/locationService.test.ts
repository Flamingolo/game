import locationServiceInstance from '../../src/service/locationService';
import Location from '../../src/model/Location';

describe('Location Service', () => {
  describe('getLocationByCharacterId', () => {
    it('should retrieve a location by characterId', async () => {
      const location = new Location({
        CharacterId: 'characterId1',
        LocationId: 'locationId1',
      });
      await location.save();

      const retrievedLocation = await locationServiceInstance.getLocationByCharacterId('characterId1');

      expect(retrievedLocation).toHaveProperty('CharacterId', 'characterId1');
      expect(retrievedLocation).toHaveProperty('LocationId', 'locationId1');
    });

    it('should throw an error if location is not found', async () => {
      await expect(locationServiceInstance.getLocationByCharacterId('invalid-characterId')).rejects.toThrow('Location not found');
    });
  });

  describe('updateCharacterLocation', () => {
    it('should update the character location', async () => {
      const location = new Location({
        CharacterId: 'characterId1',
        LocationId: 'locationId1',
      });
      await location.save();

      const updatedLocation = await locationServiceInstance.updateCharacterLocation('characterId1', 'newDungeonId');

      expect(updatedLocation).toHaveProperty('CharacterId', 'characterId1');
      expect(updatedLocation).toHaveProperty('LocationId', 'newDungeonId');
    });

    it('should create a new location if it does not exist', async () => {
      const updatedLocation = await locationServiceInstance.updateCharacterLocation('newCharacterId', 'newDungeonId');

      expect(updatedLocation).toHaveProperty('CharacterId', 'newCharacterId');
      expect(updatedLocation).toHaveProperty('LocationId', 'newDungeonId');
    });
  });
});
