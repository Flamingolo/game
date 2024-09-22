import request from 'supertest';
import express from 'express';
import itemController from '../../src/controller/itemController';
import itemServiceInstance from '../../src/service/itemService';

const app = express();
app.use(express.json());
app.get('/item/:id', itemController.getItem);

describe('Item Controller', () => {
  describe('getItem', () => {
    it('should fetch an item by id', async () => {
      const item = await itemServiceInstance.getItem('test-item-id');
      const response = await request(app).get(`/item/${item.id}`);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('id', item.id);
      expect(response.body).toHaveProperty('name', item.name);
    });

    it('should return 404 if item is not found', async () => {
      const response = await request(app).get('/item/invalid-id');

      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty('message', 'Item not found');
    });
  });
});
