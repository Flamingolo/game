import { Router } from 'express';
import { fetchCharacter, addCharacter } from '../controller/characterController';

const router = Router();

/**
 * @swagger
 * /characters/{id}:
 *   get:
 *     summary: Get a character by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The character ID
 *     responses:
 *       200:
 *         description: A character object
 *       404:
 *         description: Character not found
 */
router.get('/characters/:id', fetchCharacter);

/**
 * @swagger
 * /characters:
 *   post:
 *     summary: Create a new character
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       201:
 *         description: Character created successfully
 *       500:
 *         description: Failed to create character
 */
router.post('/characters', addCharacter);

export default router;
