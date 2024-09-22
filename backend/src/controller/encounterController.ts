import { Request, Response } from 'express';
import { getEncounterById } from '../service/encounterService';

export const fetchEncounterById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const encounter = await getEncounterById(id);
    res.status(200).json(encounter);
  } catch (error) {
    res.status(404).json({ error: 'Encounter not found', message: error.message });
  }
};
