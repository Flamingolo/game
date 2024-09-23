import { Router } from 'express';
import { fetchAllMobs, fetchMobById } from '../controller/mobController';

const router = Router();

/**
 * @swagger
 * /mobs:
 *   get:
 *     summary: Get a list of all mobs
 *     responses:
 *       200:
 *         description: A list of mobs
 *       500:
 *         description: Failed to fetch mobs
 */
router.get('/mobs', fetchAllMobs);

/**
 * @swagger
 * /mobs/{id}:
 *   get:
 *     summary: Get a mob by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The mob ID
 *     responses:
 *       200:
 *         description: A mob object
 *       404:
 *         description: Mob not found
 *       500:
 *         description: Failed to fetch mob
 */
router.get('/mobs/:id', fetchMobById);

export default router;
