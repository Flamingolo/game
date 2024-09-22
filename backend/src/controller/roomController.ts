import { Request, Response } from 'express';
import { getRoomById, getAllRoomsByDungeonIdAndCharacterId } from '../service/roomService';

export const fetchRoomById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const room = await getRoomById(id);
    res.status(200).json(room);
  } catch (error) {
    res.status(404).json({ error: 'Room not found', message: error.message });
  }
};

export const fetchRoomsByDungeonIdAndCharacterId = async (req: Request, res: Response) => {
  const { dungeonId, characterId } = req.params;

  try {
    const rooms = await getAllRoomsByDungeonIdAndCharacterId(dungeonId, characterId);
    res.status(200).json(rooms);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch rooms', message: error.message });
  }
};
