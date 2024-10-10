import request from 'supertest';
import express, { Application } from 'express';
import { fetchAllMobs, fetchMobById } from '../controller/mobController';
import Mob from '../model/Mob';
import jwtMiddleware from '../utility/jwtMiddleware';

jest.mock('../model/Mob', () => ({
  __esModule: true,
  default: {
    find: jest.fn(),
    findById: jest.fn(),
  },
}));

jest.mock('../utility/jwtMiddleware', () => jest.fn((req, res, next) => next()));

const app: Application = express();
app.use(express.json());
app.get('/mobs', jwtMiddleware, fetchAllMobs);
app.get('/mobs/:id', jwtMiddleware, fetchMobById);

describe('MobController', () => {
  describe('fetchAllMobs', () => {
    it('should fetch all mobs successfully', async () => {
      const mockMobs = [{ id: 'mob1' }, { id: 'mob2' }];
      (Mob.find as jest.Mock).mockResolvedValue(mockMobs);

      const response = await request(app)
        .get('/mobs')
        .set('Authorization', 'Bearer mockToken');

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockMobs);
      expect(Mob.find).toHaveBeenCalled();
    });

    it('should handle error when fetching all mobs', async () => {
      (Mob.find as jest.Mock).mockRejectedValue(new Error('Fetch error'));

      const response = await request(app)
        .get('/mobs')
        .set('Authorization', 'Bearer mockToken');

      expect(response.status).toBe(500);
      expect(response.body).toEqual({
        error: 'Failed to fetch mobs',
        message: 'Fetch error',
      });
    });
  });

  describe('fetchMobById', () => {
    it('should fetch mob by ID successfully', async () => {
      const mockMob = { id: 'mob1' };
      (Mob.findById as jest.Mock).mockResolvedValue(mockMob);

      const response = await request(app)
        .get('/mobs/mob1')
        .set('Authorization', 'Bearer mockToken');

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockMob);
      expect(Mob.findById).toHaveBeenCalledWith('mob1');
    });

    it('should handle error when fetching mob by ID', async () => {
      (Mob.findById as jest.Mock).mockRejectedValue(new Error('Fetch error'));

      const response = await request(app)
        .get('/mobs/mob1')
        .set('Authorization', 'Bearer mockToken');

      expect(response.status).toBe(500);
      expect(response.body).toEqual({
        error: 'Failed to fetch mob',
        message: 'Fetch error',
      });
    });

    it('should return 404 if mob not found', async () => {
      (Mob.findById as jest.Mock).mockResolvedValue(null);

      const response = await request(app)
        .get('/mobs/mob1')
        .set('Authorization', 'Bearer mockToken');

      expect(response.status).toBe(404);
      expect(response.body).toEqual({
        error: 'Mob not found',
      });
    });
  });
});
