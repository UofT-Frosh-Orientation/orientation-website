const express = require('express');

const QRController = require('../controllers/QRController');
const checkLoggedIn = require('../middlewares/checkLoggedIn');
const hasAuthScopes = require('../middlewares/hasAuthScopes');

const router = express.Router();

/**
 * @swagger
 * /QR/info:
 *   put:
 *     summary: Update isPresent flag of the scanned frosh
 *     responses:
 *       '200':
 *         description: Successfully marked frosh as present
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 frosh:
 *                   $ref: '#components/schemas/Frosh'
 *       '403':
 *         description: User is not logged in
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Please sign in to access this route!
 */
router.put(
  '/scan',
  checkLoggedIn,
  hasAuthScopes(['signInFrosh:qr-code registration']),
  QRController.getScannedUser,
);

module.exports = router;
