import request from 'supertest';
import express from 'express';
import { fetchAllMobs, fetchMobById } from '../../src/controller/mobController';
import Mob from '../../src/model/Mob';

const app = express();
app.use(express.json());
app.get('/mobs', fetchAllMobs);
app.get('/mobs/:id', fetchMobById);

describe('Mob Controller', () => {
  describe('fetchAllMobs', () => {
    it('should fetch all mobs', async () => {
      const response = await request(app).get('/mobs');

      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
    });

    it('should return 500 if fetching mobs fails', async () => {
      jest.spyOn(Mob, 'find').mockImplementation(() => {
        throw new Error('Failed to fetch mobs');
      });

      const response = await request(app).get('/mobs');

      expect(response.status).toBe(500);
      expect(response.body).toHaveProperty('error', 'Failed to fetch mobs');
    });
  });

  describe('fetchMobById', () => {
    it('should fetch a mob by id', async () => {
      const mob = new Mob({
        id: 1,
        name: 'Test Mob',
        itemIDs: null,
        levelID: 1,
        goldDrop: { min: 1, max: 10 },
        resource: { health: 100, mana: 50 },
        strength: 1,
        dexterity: 1,
        intellect: 1,
        baseDamage: 10,
        armor: 1,
      });
      await mob.save();

      const response = await request(app).get(`/mobs/${mob._id}`);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('_id', mob._id.toString());
    });

    it('should return 404 if mob is not found', async () => {
      const response = await request(app).get('/mobs/invalid-id');

      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty('error', 'Mob not found');
    });
  });
});
