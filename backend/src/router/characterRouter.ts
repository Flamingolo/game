import { Router } from 'express';
import { fetchCharacter, addCharacter, spendTalentPoint } from '../controller/characterController';
import jwtMiddleware from '../utility/jwtMiddleware';

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
router.get('/characters/:id', jwtMiddleware, fetchCharacter);

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
router.post('/characters', jwtMiddleware, addCharacter);

/**
 * @swagger
 * /characters/spend-talent-point:
 *   post:
 *     summary: Spend a talent point to increase a stat
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               characterId:
 *                 type: string
 *               stat:
 *                 type: string
 *                 enum: [strength, dexterity, intellect, luck]
 *     responses:
 *       200:
 *         description: Talent point spent successfully
 *       400:
 *         description: Failed to spend talent point
 */
router.post('/characters/spend-talent-point', jwtMiddleware, spendTalentPoint);

export default router;
