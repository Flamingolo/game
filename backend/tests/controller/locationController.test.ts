import request from 'supertest';
import express from 'express';
import { fetchLocationByCharacterId } from '../../src/controller/locationController';
import locationServiceInstance from '../../src/service/locationService';

const app = express();
app.use(express.json());
app.get('/location/:characterId', fetchLocationByCharacterId);

describe('Location Controller', () => {
  describe('fetchLocationByCharacterId', () => {
    it('should fetch location by characterId', async () => {
      const characterId = 'testCharacterId';
      const location = { CharacterId: characterId, LocationId: 'testLocationId' };
      jest.spyOn(locationServiceInstance, 'getLocationByCharacterId').mockResolvedValue(location);

      const response = await request(app).get(`/location/${characterId}`);

      expect(response.status).toBe(200);
      expect(response.body).toEqual(location);
    });

    it('should return 404 if location is not found', async () => {
      const characterId = 'invalidCharacterId';
      jest.spyOn(locationServiceInstance, 'getLocationByCharacterId').mockImplementation(() => {
        throw new Error('Location not found');
      });

      const response = await request(app).get(`/location/${characterId}`);

      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty('error', 'Location not found');
    });
  });
});
