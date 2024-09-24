import { Router } from 'express';
import { fetchLocationByCharacterId } from '../controller/locationController';
import jwtMiddleware from '../utility/jwtMiddleware';

const router = Router();

/**
 * @swagger
 * /locations/{characterId}:
 *   get:
 *     summary: Get location by character ID
 *     parameters:
 *       - in: path
 *         name: characterId
 *         required: true
 *         schema:
 *           type: string
 *         description: The character ID
 *     responses:
 *       200:
 *         description: A location object
 *       404:
 *         description: Location not found
 */
router.get('/locations/:characterId', jwtMiddleware, fetchLocationByCharacterId);

export default router;
