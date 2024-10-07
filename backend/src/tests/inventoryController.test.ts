import request from 'supertest';
import express, { Application } from 'express';
import { fetchInventoryByCharacterId } from '../controller/inventoryController';
import inventoryServiceInstance from '../service/inventoryService';
import jwtMiddleware from '../utility/jwtMiddleware';

jest.mock('../service/inventoryService', () => ({
  __esModule: true,
  default: {
    getInventoryByCharacterId: jest.fn(),
  },
}));

jest.mock('../utility/jwtMiddleware', () => jest.fn((req, res, next) => next()));

const app: Application = express();
app.use(express.json());
app.get('/inventory/:characterId', jwtMiddleware, fetchInventoryByCharacterId);

describe('InventoryController', () => {
  describe('fetchInventoryByCharacterId', () => {
    it('should fetch inventory successfully', async () => {
      const mockInventory = [{ itemId: 'item1' }, { itemId: 'item2' }];
      (inventoryServiceInstance.getInventoryByCharacterId as jest.Mock).mockResolvedValue(mockInventory);

      const response = await request(app)
        .get('/inventory/character1')
        .set('Authorization', 'Bearer mockToken');

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockInventory);
      expect(inventoryServiceInstance.getInventoryByCharacterId).toHaveBeenCalledWith('character1');
    });

    it('should handle error when fetching inventory', async () => {
      (inventoryServiceInstance.getInventoryByCharacterId as jest.Mock).mockRejectedValue(new Error('Fetch error'));

      const response = await request(app)
        .get('/inventory/character1')
        .set('Authorization', 'Bearer mockToken');

      expect(response.status).toBe(500);
      expect(response.body).toEqual({
        error: 'Failed to fetch inventory',
        message: 'Fetch error',
      });
    });
  });
});
