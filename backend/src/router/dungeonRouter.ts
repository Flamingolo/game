import { Router } from 'express';
import { listAllDungeons, getDungeonById, enterDungeon } from '../controller/dungeonController';

const router = Router();

/**
 * @swagger
 * /dungeons:
 *   get:
 *     summary: Get a list of all dungeons
 *     responses:
 *       200:
 *         description: A list of dungeons
 *       500:
 *         description: Failed to fetch dungeons
 */
router.get('/dungeons', listAllDungeons);

/**
 * @swagger
 * /dungeons/{id}:
 *   get:
 *     summary: Get a dungeon by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The dungeon ID
 *     responses:
 *       200:
 *         description: A dungeon object
 *       404:
 *         description: Dungeon not found
 *       500:
 *         description: Failed to fetch dungeon
 */
router.get('/dungeons/:id', getDungeonById);

/**
 * @swagger
 * /dungeons/enter:
 *   post:
 *     summary: Enter a dungeon
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *               characterId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successfully entered the dungeon
 *       404:
 *         description: Dungeon not found
 *       500:
 *         description: Failed to enter dungeon
 */
router.post('/dungeons/enter', enterDungeon);

export default router;
