import { Request, Response } from 'express';
import { createCharacter, getCharacter } from '../service/characterService';

export const addCharacter = async (req: Request, res: Response) => {
  const { name } = req.body;

  try {
    const character = await createCharacter(name);
    res.status(201).json(character);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create character', message: error.message });
  }
};

export const fetchCharacter = async (req: Request, res: Response) => {
    const { id } = req.params;
  
    try {
      const character = await getCharacter(id);
      res.status(200).json(character);
    } catch (error) {
      res.status(404).json({ error: 'Character not found', message: error.message });
    }
  };
