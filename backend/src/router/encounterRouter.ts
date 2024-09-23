import { Router } from 'express';
import { fetchEncounterById, performEncounterAction } from '../controller/encounterController';

const router = Router();

router.get('/encounters/:id', fetchEncounterById);
router.post('/encounters/action', performEncounterAction);

export default router;
