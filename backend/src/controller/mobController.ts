import { Request, Response } from 'express';
import Mob from '../model/Mob';
import { verifyToken } from '../utils/auth';

export const fetchAllMobs = async (req: Request, res: Response) => {
  try {
    const mobs = await Mob.find();
    res.status(200).json(mobs);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch mobs', message: error.message });
  }
};

export const fetchMobById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const mob = await Mob.findById(id);
    if (!mob) {
      res.status(404).json({ error: 'Mob not found' });
    } else {
      res.status(200).json(mob);
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch mob', message: error.message });
  }
};
