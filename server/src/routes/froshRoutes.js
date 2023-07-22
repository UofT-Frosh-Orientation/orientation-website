const express = require('express');

const FroshController = require('../controllers/FroshController');
const checkLoggedIn = require('../middlewares/checkLoggedIn');
const checkUserType = require('../middlewares/checkUserType');
const hasAuthScopes = require ("../middlewares/hasAuthScopes");
const multer = require('multer');

const storage = multer.memoryStorage();

const upload = multer({ storage });

const router = express.Router();
/**
 * @swagger
 * /frosh/register:
 *   post:
 *     summary: Register a new Frosh.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NewFrosh'
 *
 */
router.post(
  '/register',
  checkLoggedIn,
  upload.single('dataReceipt'),
  FroshController.registerFrosh,
);

/**
 * @swagger
 * /user/info:
 *   put:
 *     summary: Update existing information of the currently logged in frosh
 *     responses:
 *       '200':
 *         description: Successfully updated frosh info
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
router.put('/info', checkLoggedIn, FroshController.updateInfo);

router.get(
  '/filtered-data',
  checkLoggedIn,
  checkUserType('leadur'),
  FroshController.getFilteredFroshInfo,
);


router.post(
  '/reassign',
  checkLoggedIn,
  hasAuthScopes(['admin:all']),
  FroshController.reassignFrosh,
);

module.exports = router;
