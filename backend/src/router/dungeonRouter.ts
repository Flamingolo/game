import { Router } from 'express';
import { listAllDungeons, getDungeonById, enterDungeon } from '../controller/dungeonController';

const router = Router();

router.get('/dungeons', listAllDungeons);
router.get('/dungeons/:id', getDungeonById);
router.post('/dungeons/enter', enterDungeon);

export default router;
