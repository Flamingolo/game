import { fetchAllMobs, fetchMobById } from '../controller/mobController';
import Mob from '../model/Mob';
import { Request, Response } from 'express';
import { jest } from '@jest/globals';

jest.mock('../model/Mob');

describe('mobController', () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: jest.Mock;

  beforeEach(() => {
    req = {};
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    next = jest.fn();
  });

  describe('fetchAllMobs', () => {
    it('should return all mobs', async () => {
      const mockMobs = [{ name: 'Goblin' }, { name: 'Troll' }];
      (Mob.find as jest.Mock).mockResolvedValue(mockMobs);

      await fetchAllMobs(req as Request, res as Response, next);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockMobs);
    });

    it('should handle errors', async () => {
      const errorMessage = 'Failed to fetch mobs';
      (Mob.find as jest.Mock).mockRejectedValue(new Error(errorMessage));

      await fetchAllMobs(req as Request, res as Response, next);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: 'Failed to fetch mobs', message: errorMessage });
    });
  });

  describe('fetchMobById', () => {
    it('should return a mob by id', async () => {
      const mockMob = { name: 'Goblin' };
      (Mob.findById as jest.Mock).mockResolvedValue(mockMob);
      req = { params: { id: '1' } };

      await fetchMobById(req as Request, res as Response, next);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockMob);
    });

    it('should return 404 if mob not found', async () => {
      (Mob.findById as jest.Mock).mockResolvedValue(null);
      req = { params: { id: '1' } };

      await fetchMobById(req as Request, res as Response, next);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: 'Mob not found' });
    });

    it('should handle errors', async () => {
      const errorMessage = 'Failed to fetch mob';
      (Mob.findById as jest.Mock).mockRejectedValue(new Error(errorMessage));
      req = { params: { id: '1' } };

      await fetchMobById(req as Request, res as Response, next);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: 'Failed to fetch mob', message: errorMessage });
    });
  });
});
