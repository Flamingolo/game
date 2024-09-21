import { Router } from 'express';
import { registerUser } from '../controller/userController';

const router = Router();

router.post('/register', registerUser);

export default router;
