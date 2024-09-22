import roomServiceInstance from '../../src/service/roomService';
import Room from '../../src/model/Room';

describe('Room Service', () => {
  describe('getRoomById', () => {
    it('should retrieve a room by id', async () => {
      const room = new Room({
        characterId: 'characterId',
        dungeonId: 'dungeonId',
        mobId: 'mobId',
        itemId: 'itemId',
      });
      await room.save();

      const retrievedRoom = await roomServiceInstance.getRoomById(room._id);

      expect(retrievedRoom).toHaveProperty('characterId', 'characterId');
      expect(retrievedRoom).toHaveProperty('dungeonId', 'dungeonId');
      expect(retrievedRoom).toHaveProperty('mobId', 'mobId');
      expect(retrievedRoom).toHaveProperty('itemId', 'itemId');
    });

    it('should throw an error if room is not found', async () => {
      await expect(roomServiceInstance.getRoomById('invalid-id')).rejects.toThrow('Room not found');
    });
  });

  describe('getAllRoomsByDungeonIdAndCharacterId', () => {
    it('should retrieve all rooms by dungeonId and characterId', async () => {
      const room1 = new Room({
        characterId: 'characterId',
        dungeonId: 'dungeonId',
        mobId: 'mobId1',
        itemId: 'itemId1',
      });
      const room2 = new Room({
        characterId: 'characterId',
        dungeonId: 'dungeonId',
        mobId: 'mobId2',
        itemId: 'itemId2',
      });
      await room1.save();
      await room2.save();

      const rooms = await roomServiceInstance.getAllRoomsByDungeonIdAndCharacterId('dungeonId', 'characterId');

      expect(rooms.length).toBe(2);
      expect(rooms[0]).toHaveProperty('characterId', 'characterId');
      expect(rooms[0]).toHaveProperty('dungeonId', 'dungeonId');
      expect(rooms[1]).toHaveProperty('characterId', 'characterId');
      expect(rooms[1]).toHaveProperty('dungeonId', 'dungeonId');
    });

    it('should return an empty array if no rooms are found', async () => {
      const rooms = await roomServiceInstance.getAllRoomsByDungeonIdAndCharacterId('invalid-dungeonId', 'invalid-characterId');
      expect(rooms.length).toBe(0);
    });
  });

  describe('generateRooms', () => {
    it('should generate the specified number of rooms', async () => {
      const rooms = await roomServiceInstance.generateRooms(3);
      expect(rooms.length).toBe(3);
    });
  });

  describe('saveRoom', () => {
    it('should save a room to the database', async () => {
      const roomData = {
        characterId: 'characterId',
        dungeonId: 'dungeonId',
        mobId: 'mobId',
        itemId: 'itemId',
      };

      const savedRoom = await roomServiceInstance.saveRoom(roomData);

      expect(savedRoom).toHaveProperty('characterId', 'characterId');
      expect(savedRoom).toHaveProperty('dungeonId', 'dungeonId');
      expect(savedRoom).toHaveProperty('mobId', 'mobId');
      expect(savedRoom).toHaveProperty('itemId', 'itemId');
    });
  });

  describe('checkIfMobIsPresent', () => {
    it('should return true if a mob is present in the room', async () => {
      const room = new Room({
        characterId: 'characterId',
        dungeonId: 'dungeonId',
        mobId: 'mobId',
        itemId: 'itemId',
      });
      await room.save();

      const isMobPresent = await roomServiceInstance.checkIfMobIsPresent(room._id);
      expect(isMobPresent).toBe(true);
    });

    it('should return false if no mob is present in the room', async () => {
      const room = new Room({
        characterId: 'characterId',
        dungeonId: 'dungeonId',
        mobId: null,
        itemId: 'itemId',
      });
      await room.save();

      const isMobPresent = await roomServiceInstance.checkIfMobIsPresent(room._id);
      expect(isMobPresent).toBe(false);
    });
  });
});
