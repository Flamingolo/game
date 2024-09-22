import inventoryServiceInstance from '../../src/service/inventoryService';
import Inventory from '../../src/model/Inventory';
import mongoose from 'mongoose';

describe('Inventory Service', () => {
  describe('getInventoryByCharacterId', () => {
    it('should retrieve inventory items by characterId', async () => {
      const characterId = new mongoose.Types.ObjectId();
      const itemId = new mongoose.Types.ObjectId();

      const inventoryItem = new Inventory({ characterId, itemId });
      await inventoryItem.save();

      const inventoryItems = await inventoryServiceInstance.getInventoryByCharacterId(characterId.toString());

      expect(inventoryItems).toHaveLength(1);
      expect(inventoryItems[0]).toHaveProperty('characterId', characterId);
      expect(inventoryItems[0]).toHaveProperty('itemId', itemId);
    });

    it('should return an empty array if no inventory items are found', async () => {
      const characterId = new mongoose.Types.ObjectId();

      const inventoryItems = await inventoryServiceInstance.getInventoryByCharacterId(characterId.toString());

      expect(inventoryItems).toHaveLength(0);
    });

    it('should throw an error if there is an issue retrieving inventory items', async () => {
      const characterId = 'invalid-id';

      await expect(inventoryServiceInstance.getInventoryByCharacterId(characterId)).rejects.toThrow('Error retrieving inventory for characterId invalid-id');
    });
  });
});
