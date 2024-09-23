import { Router } from 'express';
import ItemRouter from '../controller/itemController';

const router = Router();

router.get('/items/:id', ItemRouter.getItem);

export default router;
