import { Router } from 'express';
import { fetchEncounterById, performEncounterAction } from '../controller/encounterController';

const router = Router();

/**
 * @swagger
 * /encounters/{id}:
 *   get:
 *     summary: Get an encounter by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The encounter ID
 *     responses:
 *       200:
 *         description: An encounter object
 *       404:
 *         description: Encounter not found
 */
router.get('/encounters/:id', fetchEncounterById);

/**
 * @swagger
 * /encounters/action:
 *   post:
 *     summary: Perform an action in an encounter
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               encounterId:
 *                 type: string
 *               action:
 *                 type: object
 *                 properties:
 *                   type:
 *                     type: string
 *     responses:
 *       200:
 *         description: Action performed successfully
 *       400:
 *         description: Failed to perform action
 */
router.post('/encounters/action', performEncounterAction);

export default router;
