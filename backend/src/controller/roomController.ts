import { Request, Response } from 'express';
import roomServiceInstance from '../service/roomService';
import mobServiceInstance from '../service/mobService';
import encounterServiceInstance from '../service/encounterService';
import characterServiceInstance from '../service/characterService';

export const fetchRoomById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const room = await roomServiceInstance.getRoomById(id);
    res.status(200).json(room);
  } catch (error) {
    res.status(404).json({ error: 'Room not found', message: error.message });
  }
};

export const fetchRoomsByDungeonIdAndCharacterId = async (req: Request, res: Response) => {
  const { dungeonId, characterId } = req.params;

  try {
    const rooms = await roomServiceInstance.getAllRoomsByDungeonIdAndCharacterId(dungeonId, characterId);
    res.status(200).json(rooms);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch rooms', message: error.message });
  }
};

export const enterRoom = async (req: Request, res: Response) => {
  const { id, characterId } = req.body;

  try {
    const room = await roomServiceInstance.getRoomById(id);
    if (!room) {
      return res.status(404).json({ error: 'Room not found' });
    }

    if (room.mobId) {
      const mob = await mobServiceInstance.getMobById(room.mobId.toString());
      if (!mob) {
        return res.status(404).json({ error: 'Mob not found' });
      }
      
      const character = await characterServiceInstance.getCharacter(characterId);
      const encounterData = {
        RoomId: room._id,
        CharacterId: characterId,
        MobId: mob._id,
        MobRemainingHealth: mob.resource.health,
        MobRemainingMana: mob.resource.mana,
        CharacterRemainingHealth: character.resource.currentHealth,
        CharacterRemainingMana: character.resource.currentMana,
      };

      const encounter = await encounterServiceInstance.createEncounter(encounterData);
      return res.status(200).json({ encounterId: encounter._id });
    } else {
      return res.status(200).json({ itemId: room.itemId });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to enter room', message: error.message });
  }
};
