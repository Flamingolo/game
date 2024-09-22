import { Request, Response } from 'express';
import { getLocationByCharacterId } from '../service/locationService';

export const fetchLocationByCharacterId = async (req: Request, res: Response) => {
  const { characterId } = req.params;

  try {
    const location = await getLocationByCharacterId(characterId);
    res.status(200).json(location);
  } catch (error) {
    res.status(404).json({ error: 'Location not found', message: error.message });
  }
};
