import { Router } from 'express';
import { fetchLocationByCharacterId } from '../controller/locationController';

const router = Router();

router.get('/location/:characterId', fetchLocationByCharacterId);

export default router;
