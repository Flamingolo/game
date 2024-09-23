import { Router } from 'express';
import { fetchInventoryByCharacterId } from '../controller/inventoryController';
import jwtMiddleware from '../utility/jwtMiddleware';

const router = Router();

/**
 * @swagger
 * /inventory/{characterId}:
 *   get:
 *     summary: Get inventory by character ID
 *     parameters:
 *       - in: path
 *         name: characterId
 *         required: true
 *         schema:
 *           type: string
 *         description: The character ID
 *     responses:
 *       200:
 *         description: A list of inventory items
 *       500:
 *         description: Failed to fetch inventory
 */
router.get('/inventory/:characterId', jwtMiddleware, fetchInventoryByCharacterId);

export default router;
