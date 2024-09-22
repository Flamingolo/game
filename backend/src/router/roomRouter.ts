import { Router } from 'express';
import { fetchRoomById, fetchRoomsByDungeonIdAndCharacterId, enterRoom } from '../controller/roomController';

const router = Router();

router.get('/room/:id', fetchRoomById);
router.get('/rooms/:dungeonId/:characterId', fetchRoomsByDungeonIdAndCharacterId);
router.post('/room/enter', enterRoom);

export default router;
