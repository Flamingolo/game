import Location from '../model/Location';

class LocationService {
  async getLocationByCharacterId(characterId: string) {
    try {
      const location = await Location.findOne({ CharacterId: characterId });
      if (!location) {
        throw new Error('Location not found');
      }
      return location;
    } catch (error) {
      throw new Error(`Error retrieving location: ${error.message}`);
    }
  }

  async updateCharacterLocation(characterId: string, dungeonId: string) {
    try {
      const location = await Location.findOneAndUpdate(
        { CharacterId: characterId },
        { $set: { dungeonId: dungeonId } },
        { new: true, upsert: true }
      );
      return location;
    } catch (error) {
      throw new Error(`Error updating character location: ${error.message}`);
    }
  }

  async deleteCharacterLocationByCharacterId(characterId: string) {
    try {
      await Location.deleteOne({ CharacterId: characterId });
    } catch (error) {
      throw new Error(`Error deleting character location: ${error.message}`);
    }
  }
}

const locationServiceInstance = new LocationService();
export default locationServiceInstance;
