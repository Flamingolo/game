import { Request, Response } from 'express';
import Dungeon from '../model/Dungeon';
import dungeonServiceInstance from '../service/dungeonService';
import roomServiceInstance from '../service/roomService';
import mobServiceInstance from '../service/mobService';
import locationServiceInstance from '../service/locationService';
import itemServiceInstance from '../service/itemService';

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

export const enterDungeon = async (req: Request, res: Response) => {
  const { id, characterId } = req.body;

  try {
    const dungeon = await dungeonServiceInstance.getDungeonById(id);
    if (!dungeon) {
      return res.status(404).json({ error: 'Dungeon not found' });
    }

    const rooms = await roomServiceInstance.generateRooms(dungeon.roomAmount);
    const roomIds = [];

    for (const room of rooms) {
      const randomItem = await itemServiceInstance.getRandomItem();
      const randomMob = await mobServiceInstance.getRandomMob();

      const roomData = {
        characterId,
        id,
        mobId: randomMob ? randomMob._id : null,
        itemId: randomItem ? randomItem._id : null,
      };

      const savedRoom = await roomServiceInstance.saveRoom(roomData);
      roomIds.push(savedRoom._id);
    }

    await locationServiceInstance.updateCharacterLocation(characterId, id);

    res.status(200).json({ roomIds });
  } catch (error) {
    res.status(500).json({ error: 'Failed to enter dungeon', message: error.message });
  }
};
