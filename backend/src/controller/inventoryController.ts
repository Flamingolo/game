import { Request, Response } from 'express';
import inventoryServiceInstance from '../service/inventoryService';

export const fetchInventoryByCharacterId = async (req: Request, res: Response) => {
  const { characterId } = req.params;

  try {
    const inventoryItems = await inventoryServiceInstance.getInventoryByCharacterId(characterId);
    res.status(200).json(inventoryItems);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch inventory', message: error.message });
  }
};
