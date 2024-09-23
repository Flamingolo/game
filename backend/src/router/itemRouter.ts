import { Router } from 'express';
import ItemRouter from '../controller/itemController';
import jwtMiddleware from '../utility/jwtMiddleware';

const router = Router();

/**
 * @swagger
 * /items/{id}:
 *   get:
 *     summary: Get an item by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The item ID
 *     responses:
 *       200:
 *         description: An item object
 *       404:
 *         description: Item not found
 */
router.get('/items/:id', jwtMiddleware, ItemRouter.getItem);

export default router;
