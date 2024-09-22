import request from 'supertest';
import express from 'express';
import { fetchEncounterById, performEncounterAction } from '../../src/controller/encounterController';
import encounterServiceInstance from '../../src/service/encounterService';

const app = express();
app.use(express.json());
app.get('/encounter/:id', fetchEncounterById);
app.post('/encounter/action', performEncounterAction);

describe('Encounter Controller', () => {
  describe('fetchEncounterById', () => {
    it('should fetch an encounter by id', async () => {
      const encounter = await encounterServiceInstance.createEncounter({
        RoomId: 'test-room-id',
        CharacterId: 'test-character-id',
        MobId: 'test-mob-id',
        MobRemainingHealth: 100,
        MobRemainingMana: 50,
        CharacterRemainingHealth: 100,
        CharacterRemainingMana: 50,
      });
      const response = await request(app).get(`/encounter/${encounter._id}`);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('_id', encounter._id);
    });

    it('should return 404 if encounter is not found', async () => {
      const response = await request(app).get('/encounter/invalid-id');

      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty('error', 'Encounter not found');
    });
  });

  describe('performEncounterAction', () => {
    it('should perform an attack action', async () => {
      const encounter = await encounterServiceInstance.createEncounter({
        RoomId: 'test-room-id',
        CharacterId: 'test-character-id',
        MobId: 'test-mob-id',
        MobRemainingHealth: 100,
        MobRemainingMana: 50,
        CharacterRemainingHealth: 100,
        CharacterRemainingMana: 50,
      });

      const response = await request(app)
        .post('/encounter/action')
        .send({ encounterId: encounter._id, action: { type: 'attack' } });

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('encounter');
      expect(response.body).toHaveProperty('character');
      expect(response.body).toHaveProperty('mob');
      expect(response.body).toHaveProperty('characterDamage');
      expect(response.body).toHaveProperty('mobDamage');
    });

    it('should return 400 for invalid action type', async () => {
      const encounter = await encounterServiceInstance.createEncounter({
        RoomId: 'test-room-id',
        CharacterId: 'test-character-id',
        MobId: 'test-mob-id',
        MobRemainingHealth: 100,
        MobRemainingMana: 50,
        CharacterRemainingHealth: 100,
        CharacterRemainingMana: 50,
      });

      const response = await request(app)
        .post('/encounter/action')
        .send({ encounterId: encounter._id, action: { type: 'invalid' } });

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('error', 'Failed to perform encounter action');
    });
  });
});
