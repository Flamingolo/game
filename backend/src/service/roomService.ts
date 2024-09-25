import Room from '../model/Room';

class RoomService {
  async getRoomById(id: string) {
    try {
      const room = await Room.findById(id);
      if (!room) {
        throw new Error('Room not found');
      }
      return room;
    } catch (error) {
      throw new Error(`Error retrieving room: ${error.message}`);
    }
  }

  async getAllRoomsByDungeonIdAndCharacterId(dungeonId: string, characterId: string) {
    try {
      const rooms = await Room.find({ dungeonId, characterId });
      return rooms;
    } catch (error) {
      throw new Error(`Error retrieving rooms: ${error.message}`);
    }
  }

  async generateRooms(roomAmount: number) {
    const rooms = [];
    for (let i = 0; i < roomAmount; i++) {
      const room = new Room();
      rooms.push(room);
    }
    return rooms;
  }

  async saveRoom(roomData: any) {
    const room = new Room(roomData);
    await room.save();
    return room;
  }

  async checkIfMobIsPresent(roomId: string) {
    try {
      const room = await Room.findById(roomId);
      if (!room) {
        throw new Error('Room not found');
      }
      return room.mobId ? true : false;
    } catch (error) {
      throw new Error(`Error checking for mob in room: ${error.message}`);
    }
  }

  async deleteRoomsByCharacterIdAndDungeonId(characterId: string, dungeonId: string) {
    try {
      await Room.deleteMany({ characterId, dungeonId });
    } catch (error) {
      throw new Error(`Error deleting rooms: ${error.message}`);
    }
  }
}

const roomServiceInstance = new RoomService();
export default roomServiceInstance;
