import { Router } from 'express';
import { fetchRoomById, fetchRoomsByDungeonIdAndCharacterId, enterRoom } from '../controller/roomController';

const router = Router();

router.get('/rooms/:id', fetchRoomById);
router.get('/rooms/:dungeonId/:characterId', fetchRoomsByDungeonIdAndCharacterId);
router.post('/rooms/enter', enterRoom);

export default router;
