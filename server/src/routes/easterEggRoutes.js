const express = require('express');
const checkLoggedIn = require('../middlewares/checkLoggedIn');
const checkUserType = require('../middlewares/checkUserType');
const hasAuthScopes = require('../middlewares/hasAuthScopes');
const EasterEggController = require('../controllers/EasterEggController');

const router = express.Router();

/**
 * @swagger
 * /easter-egg/frosh-memory:
 *   post:
 *     summary: Records a submission from the hidden Skule Hunt easter-egg trail
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               scuntTeam:
 *                 type: string
 *               memory:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Submission received
 *       '400':
 *         description: Missing, invalid or oversized fields
 *       '429':
 *         description: Too many submissions from this IP
 */
router.post('/frosh-memory', EasterEggController.submitFroshMemory);

/**
 * @swagger
 * /easter-egg/frosh-memory:
 *   get:
 *     summary: Reads back the easter-egg submissions (admins only)
 *     responses:
 *       '200':
 *         description: Successfully retrieved the submissions
 *       '403':
 *         $ref: '#components/responses/NotLoggedIn'
 */
router.get(
  '/frosh-memory',
  checkLoggedIn,
  checkUserType('leadur'),
  hasAuthScopes(['admin:all']),
  EasterEggController.getFroshMemories,
);

module.exports = router;
