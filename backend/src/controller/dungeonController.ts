import { Request, Response } from 'express';
import Dungeon from '../model/Dungeon';

export const listAllDungeons = async (req: Request, res: Response) => {
  try {
    const dungeons = await Dungeon.find();
    res.status(200).json(dungeons);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch dungeons', message: error.message });
  }
};

export const getDungeonById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const dungeon = await Dungeon.findById(id);
    if (!dungeon) {
      res.status(404).json({ error: 'Dungeon not found' });
    } else {
      res.status(200).json(dungeon);
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch dungeon', message: error.message });
  }
};
