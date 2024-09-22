import { Router } from 'express';
import { fetchEncounterById, performEncounterAction } from '../controller/encounterController';

const router = Router();

router.get('/encounter/:id', fetchEncounterById);
router.post('/encounter/action', performEncounterAction);

export default router;
