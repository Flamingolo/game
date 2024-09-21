import { Router } from 'express';
import { fetchCharacter, addCharacter } from '../controller/characterController';

const router = Router();

router.get('/character/:id', fetchCharacter);
router.post('/character', addCharacter);

export default router;
