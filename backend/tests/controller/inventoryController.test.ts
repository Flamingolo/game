import request from 'supertest';
import express from 'express';
import { fetchInventoryByCharacterId } from '../../src/controller/inventoryController';
import inventoryServiceInstance from '../../src/service/inventoryService';

const app = express();
app.use(express.json());
app.get('/inventory/:characterId', fetchInventoryByCharacterId);

describe('Inventory Controller', () => {
  describe('fetchInventoryByCharacterId', () => {
    it('should fetch inventory items by character id', async () => {
      const characterId = 'test-character-id';
      const inventoryItems = [
        { itemId: 'item1', name: 'Sword', value: 100 },
        { itemId: 'item2', name: 'Shield', value: 150 },
      ];

      jest.spyOn(inventoryServiceInstance, 'getInventoryByCharacterId').mockResolvedValue(inventoryItems);

      const response = await request(app).get(`/inventory/${characterId}`);

      expect(response.status).toBe(200);
      expect(response.body).toEqual(inventoryItems);
    });

    it('should return 500 if fetching inventory fails', async () => {
      const characterId = 'test-character-id';

      jest.spyOn(inventoryServiceInstance, 'getInventoryByCharacterId').mockImplementation(() => {
        throw new Error('Failed to fetch inventory');
      });

      const response = await request(app).get(`/inventory/${characterId}`);

      expect(response.status).toBe(500);
      expect(response.body).toHaveProperty('error', 'Failed to fetch inventory');
    });
  });
});
