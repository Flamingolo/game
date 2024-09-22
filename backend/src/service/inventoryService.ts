import Inventory from '../model/Inventory';

export const getInventoryByCharacterId = async (characterId: string) => {
  try {
    const inventoryItems = await Inventory.find({ characterId }).populate('itemId');
    return inventoryItems;
  } catch (error) {
    throw new Error(`Error retrieving inventory for characterId ${characterId}: ${error.message}`);
  }
};
