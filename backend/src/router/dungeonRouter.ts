import { Router } from 'express';
import { listAllDungeons, getDungeonById } from '../controller/dungeonController';

const router = Router();

router.get('/dungeons', listAllDungeons);
router.get('/dungeons/:id', getDungeonById);

export default router;
