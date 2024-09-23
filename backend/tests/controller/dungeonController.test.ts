import request from 'supertest';
import express from 'express';
import { listAllDungeons, getDungeonById, enterDungeon } from '../../src/controller/dungeonController';
import dungeonServiceInstance from '../../src/service/dungeonService';
import roomServiceInstance from '../../src/service/roomService';
import mobServiceInstance from '../../src/service/mobService';
import locationServiceInstance from '../../src/service/locationService';
import itemServiceInstance from '../../src/service/itemService';

const app = express();
app.use(express.json());
app.get('/dungeons', listAllDungeons);
app.get('/dungeons/:id', getDungeonById);
app.post('/dungeons/enter', enterDungeon);

describe('Dungeon Controller', () => {
  describe('listAllDungeons', () => {
    it('should list all dungeons', async () => {
      const response = await request(app).get('/dungeons');

      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
    });

    it('should return 500 if fetching dungeons fails', async () => {
      jest.spyOn(Dungeon, 'find').mockImplementation(() => {
        throw new Error('Failed to fetch dungeons');
      });

      const response = await request(app).get('/dungeons');

      expect(response.status).toBe(500);
      expect(response.body).toHaveProperty('error', 'Failed to fetch dungeons');
    });
  });

  describe('getDungeonById', () => {
    it('should fetch a dungeon by id', async () => {
      const dungeon = await dungeonServiceInstance.generateRandomDungeon(1);
      const response = await request(app).get(`/dungeons/${dungeon._id}`);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('_id', dungeon._id);
    });

    it('should return 404 if dungeon is not found', async () => {
      const response = await request(app).get('/dungeons/invalid-id');

      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty('error', 'Dungeon not found');
    });
  });

  describe('enterDungeon', () => {
    it('should enter a dungeon and generate rooms', async () => {
      const dungeon = await dungeonServiceInstance.generateRandomDungeon(1);
      const characterId = 'test-character-id';

      const response = await request(app)
        .post('/dungeons/enter')
        .send({ dungeonId: dungeon._id, characterId });

      expect(response.status).toBe(200);
      expect(Array.isArray(response.body.roomIds)).toBe(true);
    });

    it('should return 404 if dungeon is not found', async () => {
      const response = await request(app)
        .post('/dungeons/enter')
        .send({ dungeonId: 'invalid-id', characterId: 'test-character-id' });

      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty('error', 'Dungeon not found');
    });

    it('should return 500 if entering dungeon fails', async () => {
      jest.spyOn(dungeonServiceInstance, 'getDungeonById').mockImplementation(() => {
        throw new Error('Failed to enter dungeon');
      });

      const response = await request(app)
        .post('/dungeons/enter')
        .send({ dungeonId: 'test-dungeon-id', characterId: 'test-character-id' });

      expect(response.status).toBe(500);
      expect(response.body).toHaveProperty('error', 'Failed to enter dungeon');
    });
  });
});
