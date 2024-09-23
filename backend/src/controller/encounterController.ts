import { Request, Response } from 'express';
import encounterServiceInstance from '../service/encounterService';

export const fetchEncounterById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const encounter = await encounterServiceInstance.getEncounterById(id);
    res.status(200).json(encounter);
  } catch (error) {
    res.status(404).json({ error: 'Encounter not found', message: error.message });
  }
};

export const performEncounterAction = async (req: Request, res: Response) => {
  const { encounterId: id, action } = req.body;

  try {
    if (action.type === 'attack') {
      const result = await encounterServiceInstance.performEncounterAction(id, action);
      res.status(200).json(result);
    } else if (action.type === 'defend' || action.type === 'run') {
      throw new Error('Action not implemented');
    } else {
      throw new Error('Invalid action type');
    }
  } catch (error) {
    res.status(400).json({ error: 'Failed to perform encounter action', message: error.message });
  }
};
