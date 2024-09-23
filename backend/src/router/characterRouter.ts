import { Router } from 'express';
import { fetchCharacter, addCharacter } from '../controller/characterController';

const router = Router();

router.get('/characters/:id', fetchCharacter);
router.post('/characters', addCharacter);

export default router;
