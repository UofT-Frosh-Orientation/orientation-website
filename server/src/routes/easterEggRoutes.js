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
 *     description: >
 *       One submission per user. Name, email and team are taken from the signed
 *       in user, not the request body.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               memory:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Submission received
 *       '400':
 *         description: Empty or oversized submission
 *       '403':
 *         $ref: '#components/responses/NotLoggedIn'
 *       '409':
 *         description: This user has already submitted
 */
router.post('/frosh-memory', checkLoggedIn, EasterEggController.submitFroshMemory);

/**
 * @swagger
 * /easter-egg/frosh-memory/status:
 *   get:
 *     summary: Whether the signed in user has already submitted
 *     responses:
 *       '200':
 *         description: Successfully retrieved the submission status
 *       '403':
 *         $ref: '#components/responses/NotLoggedIn'
 */
router.get('/frosh-memory/status', checkLoggedIn, EasterEggController.getFroshMemoryStatus);

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
