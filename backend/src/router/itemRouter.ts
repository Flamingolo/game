import { Router } from 'express';
import ItemRouter from '../controller/itemController';

const router = Router();

router.get('/item/:id', ItemRouter.getItem);

export default router;
