import Location from '../model/Location';

export const getLocationByCharacterId = async (characterId: string) => {
  try {
    const location = await Location.findOne({ CharacterId: characterId });
    if (!location) {
      throw new Error('Location not found');
    }
    return location;
  } catch (error) {
    throw new Error(`Error retrieving location: ${error.message}`);
  }
};
