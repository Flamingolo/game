import Inventory from '../model/Inventory';

class InventoryService {
  async getInventoryByCharacterId(characterId: string) {
    try {
      const inventoryItems = await Inventory.find({ characterId }).populate('itemId');
      return inventoryItems;
    } catch (error) {
      throw new Error(`Error retrieving inventory for characterId ${characterId}: ${error.message}`);
    }
  };
}

const inventoryServiceInstance = new InventoryService();
export default inventoryServiceInstance;
