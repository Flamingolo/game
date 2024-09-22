import Encounter from '../model/Encounter';

export const getEncounterById = async (id: string) => {
  try {
    const encounter = await Encounter.findById(id);
    if (!encounter) {
      throw new Error('Encounter not found');
    }
    return encounter;
  } catch (error) {
    throw new Error(`Error retrieving encounter: ${error.message}`);
  }
};
