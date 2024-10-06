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

  async saveItem(characterId: string, itemIds: string[]) {
    itemIds.forEach((id: string) => {
      const inventory = new Inventory(characterId, id);
      inventory.save();
    });
  }
};

const inventoryServiceInstance = new InventoryService();
export default inventoryServiceInstance;
