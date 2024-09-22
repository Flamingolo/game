import Room from '../model/Room';

export const getRoomById = async (id: string) => {
  try {
    const room = await Room.findById(id);
    if (!room) {
      throw new Error('Room not found');
    }
    return room;
  } catch (error) {
    throw new Error(`Error retrieving room: ${error.message}`);
  }
};

export const getAllRoomsByDungeonIdAndCharacterId = async (dungeonId: string, characterId: string) => {
  try {
    const rooms = await Room.find({ dungeonId, characterId });
    return rooms;
  } catch (error) {
    throw new Error(`Error retrieving rooms: ${error.message}`);
  }
};
