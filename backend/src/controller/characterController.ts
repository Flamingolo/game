import { Request, Response } from 'express';
import characterceInstance from '../service/characterService';
import { verifyToken } from '../utils/auth';

export const addCharacter = async (req: Request, res: Response) => {
  const { name } = req.body;

  try {
    const character = await characterceInstance.createCharacter(name);
    res.status(201).json({
      id: character.id,
      name: character.name,
      levelId: character.levelId,
      progress: character.progress,
      stats: character.stats,
      gold: character.gold,
      resource: character.resource,
      unspentTalentPoints: character.unspentTalentPoints,
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create character', message: error.message });
  }
};

export const fetchCharacter = async (req: Request, res: Response) => {
    const { id } = req.params;
  
    try {
      const character = await characterceInstance.getCharacter(id);
      res.status(200).json(character);
    } catch (error) {
      res.status(404).json({ error: 'Character not found', message: error.message });
    }
  };
