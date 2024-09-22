import request from 'supertest';
import express from 'express';
import { addCharacter, fetchCharacter } from '../../src/controller/characterController';
import characterServiceInstance from '../../src/service/characterService';

const app = express();
app.use(express.json());
app.post('/character', addCharacter);
app.get('/character/:id', fetchCharacter);

describe('Character Controller', () => {
  describe('addCharacter', () => {
    it('should create a new character', async () => {
      const response = await request(app)
        .post('/character')
        .send({ name: 'Test Character' });

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('id');
      expect(response.body.name).toBe('Test Character');
    });

    it('should return 500 if character creation fails', async () => {
      jest.spyOn(characterServiceInstance, 'createCharacter').mockImplementation(() => {
        throw new Error('Failed to create character');
      });

      const response = await request(app)
        .post('/character')
        .send({ name: 'Test Character' });

      expect(response.status).toBe(500);
      expect(response.body).toHaveProperty('error', 'Failed to create character');
    });
  });

  describe('fetchCharacter', () => {
    it('should fetch a character by id', async () => {
      const character = await characterServiceInstance.createCharacter('Test Character');
      const response = await request(app).get(`/character/${character.id}`);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('id', character.id);
      expect(response.body).toHaveProperty('name', character.name);
    });

    it('should return 404 if character is not found', async () => {
      const response = await request(app).get('/character/invalid-id');

      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty('error', 'Character not found');
    });
  });
});
