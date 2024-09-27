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

/**
 * @swagger
 * /items/collect:
 *   post:
 *     summary: Collect an item
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               encounterId:
 *                 type: string
 *               mobId:
 *                 type: string
 *               roomId:
 *                 type: string
 *               characterId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Item collected successfully
 *       400:
 *         description: Invalid request
 *       404:
 *         description: Room or mob not found
 *       500:
 *         description: Failed to collect item
 */
router.post('/items/collect', jwtMiddleware, ItemRouter.collectItem);

/**
 * @swagger
 * /items/destroy:
 *   post:
 *     summary: Destroy an item
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               encounterId:
 *                 type: string
 *               mobId:
 *                 type: string
 *               roomId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Item destroyed successfully
 *       400:
 *         description: Invalid request
 *       404:
 *         description: Room or mob not found
 *       500:
 *         description: Failed to destroy item
 */
router.post('/items/destroy', jwtMiddleware, ItemRouter.destroyItem);

export default router;
