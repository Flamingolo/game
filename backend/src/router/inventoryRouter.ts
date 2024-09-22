import { Router } from 'express';
import { fetchInventoryByCharacterId } from '../controller/inventoryController';

const router = Router();

router.get('/inventory/:characterId', fetchInventoryByCharacterId);

export default router;
