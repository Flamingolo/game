import { Request, Response } from 'express';
import itemServiceInstance from '../service/itemService';
import roomServiceInstance from '../service/roomService';
import encounterServiceInstance from '../service/encounterService';
import inventoryServiceInstance from '../service/inventoryService';

class ItemController {
    constructor(private itemService: typeof itemServiceInstance) { }

    async getItem(req: Request, res: Response) {
        const id = req.params.id;
        try {
            const item = await this.itemService.getItem(id);
            res.status(200).json(item);
        } catch (error) {
            res.status(404).json({ message: error.message });
        }
    }

    async collectItem(req: Request, res: Response) {
        const { encounterId, mobId, roomId, characterId } = req.body;

        try {
            let itemId;

            if (roomId) {
                const room = await roomServiceInstance.getRoomById(roomId);
                if (!room) {
                    return res.status(404).json({ message: 'Room not found' });
                }
                itemId = room.itemId;
            } else if (mobId) {
                const encounter = await encounterServiceInstance.getEncounterById(encounterId);
                if (!encounter || encounter.MobRemainingHealth > 0) {
                    return res.status(400).json({ message: 'Cannot collect item, mob is not dead' });
                }
                const mob = await mobServiceInstance.getMobById(mobId);
                itemId = mob.itemId;
            } else {
                return res.status(400).json({ message: 'Invalid request' });
            }

            await inventoryServiceInstance.addItemToInventory(characterId, itemId);
            res.status(200).json({ message: 'Item collected successfully' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async destroyItem(req: Request, res: Response) {
        const { encounterId, mobId, roomId } = req.body;

        try {
            if (roomId) {
                const room = await roomServiceInstance.getRoomById(roomId);
                if (!room) {
                    return res.status(404).json({ message: 'Room not found' });
                }
            } else if (mobId) {
                const encounter = await encounterServiceInstance.getEncounterById(encounterId);
                if (!encounter || encounter.MobRemainingHealth > 0) {
                    return res.status(400).json({ message: 'Cannot destroy item, mob is not dead' });
                }
            } else {
                return res.status(400).json({ message: 'Invalid request' });
            }

            res.status(200).json({ message: 'Item destroyed successfully' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}

const itemController = new ItemController(itemServiceInstance);
export default itemController;
