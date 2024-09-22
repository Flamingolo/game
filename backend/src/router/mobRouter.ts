import { Router } from 'express';
import { fetchAllMobs, fetchMobById } from '../controller/mobController';

const router = Router();

router.get('/mobs', fetchAllMobs);
router.get('/mobs/:id', fetchMobById);

export default router;
