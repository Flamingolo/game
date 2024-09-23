import { Router } from 'express';
import { fetchRoomById, fetchRoomsByDungeonIdAndCharacterId, enterRoom } from '../controller/roomController';

const router = Router();

/**
 * @swagger
 * /rooms/{id}:
 *   get:
 *     summary: Get a room by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The room ID
 *     responses:
 *       200:
 *         description: A room object
 *       404:
 *         description: Room not found
 */
router.get('/rooms/:id', fetchRoomById);

/**
 * @swagger
 * /rooms/{dungeonId}/{characterId}:
 *   get:
 *     summary: Get rooms by dungeon ID and character ID
 *     parameters:
 *       - in: path
 *         name: dungeonId
 *         required: true
 *         schema:
 *           type: string
 *         description: The dungeon ID
 *       - in: path
 *         name: characterId
 *         required: true
 *         schema:
 *           type: string
 *         description: The character ID
 *     responses:
 *       200:
 *         description: A list of rooms
 *       500:
 *         description: Failed to fetch rooms
 */
router.get('/rooms/:dungeonId/:characterId', fetchRoomsByDungeonIdAndCharacterId);

/**
 * @swagger
 * /rooms/enter:
 *   post:
 *     summary: Enter a room
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
 *         description: Successfully entered the room
 *       404:
 *         description: Room not found
 *       500:
 *         description: Failed to enter room
 */
router.post('/rooms/enter', enterRoom);

export default router;
