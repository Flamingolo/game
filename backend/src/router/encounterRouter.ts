import { Router } from 'express';
import { fetchEncounterById } from '../controller/encounterController';

const router = Router();

router.get('/encounter/:id', fetchEncounterById);

export default router;
