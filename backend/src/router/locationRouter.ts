import { Router } from 'express';
import { fetchLocationByCharacterId } from '../controller/locationController';

const router = Router();

router.get('/locations/:characterId', fetchLocationByCharacterId);

export default router;
