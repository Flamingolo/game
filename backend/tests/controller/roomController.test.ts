import request from 'supertest';
import express from 'express';
import { fetchRoomById, fetchRoomsByDungeonIdAndCharacterId, enterRoom } from '../../src/controller/roomController';
import roomServiceInstance from '../../src/service/roomService';
import mobServiceInstance from '../../src/service/mobService';
import encounterServiceInstance from '../../src/service/encounterService';
import characterServiceInstance from '../../src/service/characterService';

const app = express();
app.use(express.json());
app.get('/room/:id', fetchRoomById);
app.get('/rooms/:dungeonId/:characterId', fetchRoomsByDungeonIdAndCharacterId);
app.post('/room/enter', enterRoom);

describe('Room Controller', () => {
  describe('fetchRoomById', () => {
    it('should fetch a room by id', async () => {
      const room = await roomServiceInstance.saveRoom({
        characterId: 'test-character-id',
        dungeonId: 'test-dungeon-id',
        mobId: 'test-mob-id',
        itemId: 'test-item-id',
      });
      const response = await request(app).get(`/room/${room._id}`);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('_id', room._id);
    });

    it('should return 404 if room is not found', async () => {
      const response = await request(app).get('/room/invalid-id');

      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty('error', 'Room not found');
    });
  });

  describe('fetchRoomsByDungeonIdAndCharacterId', () => {
    it('should fetch rooms by dungeonId and characterId', async () => {
      const room = await roomServiceInstance.saveRoom({
        characterId: 'test-character-id',
        dungeonId: 'test-dungeon-id',
        mobId: 'test-mob-id',
        itemId: 'test-item-id',
      });
      const response = await request(app).get(`/rooms/${room.dungeonId}/${room.characterId}`);

      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
    });

    it('should return 500 if fetching rooms fails', async () => {
      jest.spyOn(roomServiceInstance, 'getAllRoomsByDungeonIdAndCharacterId').mockImplementation(() => {
        throw new Error('Failed to fetch rooms');
      });

      const response = await request(app).get('/rooms/test-dungeon-id/test-character-id');

      expect(response.status).toBe(500);
      expect(response.body).toHaveProperty('error', 'Failed to fetch rooms');
    });
  });

  describe('enterRoom', () => {
    it('should enter a room and create an encounter if mob is present', async () => {
      const room = await roomServiceInstance.saveRoom({
        characterId: 'test-character-id',
        dungeonId: 'test-dungeon-id',
        mobId: 'test-mob-id',
        itemId: 'test-item-id',
      });

      const response = await request(app)
        .post('/room/enter')
        .send({ roomId: room._id, characterId: room.characterId });

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('encounterId');
    });

    it('should return 404 if room is not found', async () => {
      const response = await request(app)
        .post('/room/enter')
        .send({ roomId: 'invalid-id', characterId: 'test-character-id' });

      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty('error', 'Room not found');
    });

    it('should return 500 if entering room fails', async () => {
      jest.spyOn(roomServiceInstance, 'getRoomById').mockImplementation(() => {
        throw new Error('Failed to enter room');
      });

      const response = await request(app)
        .post('/room/enter')
        .send({ roomId: 'test-room-id', characterId: 'test-character-id' });

      expect(response.status).toBe(500);
      expect(response.body).toHaveProperty('error', 'Failed to enter room');
    });
  });
});
