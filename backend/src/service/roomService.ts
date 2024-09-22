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

export const generateRooms = async (roomAmount: number) => {
  const rooms = [];
  for (let i = 0; i < roomAmount; i++) {
    const room = new Room();
    rooms.push(room);
  }
  return rooms;
};

export const saveRoom = async (roomData: any) => {
  const room = new Room(roomData);
  await room.save();
  return room;
};
