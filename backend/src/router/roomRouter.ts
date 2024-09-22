import { Router } from 'express';
import { fetchRoomById, fetchRoomsByDungeonIdAndCharacterId } from '../controller/roomController';

const router = Router();

router.get('/room/:id', fetchRoomById);
router.get('/rooms/:dungeonId/:characterId', fetchRoomsByDungeonIdAndCharacterId);

export default router;
