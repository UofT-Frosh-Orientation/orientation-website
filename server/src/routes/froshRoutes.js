const express = require('express');

const FroshController = require('../controllers/FroshController');
const OlympikEventController = require('../controllers/OlympikEventController');
const checkLoggedIn = require('../middlewares/checkLoggedIn');
const checkUserType = require('../middlewares/checkUserType');
const hasAuthScopes = require('../middlewares/hasAuthScopes');
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

router.post('/search', checkLoggedIn, checkUserType('leadur'), FroshController.searchFrosh);

router.post(
  '/redistribute',
  checkLoggedIn,
  hasAuthScopes(['admin:all']),
  FroshController.reassignFrosh,
);

/**
 * @swagger
 * /frosh/olympiks-signup:
 *   post:
 *     summary: Sign up for an Olympik event
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               eventId:
 *                 type: string
 *                 description: The ID of the event to sign up for
 *               discipline:
 *                 type: string
 *                 enum: [MSE, Mech, CivMin, Indy, TrackOne, ECE, EngSci, Chem]
 *                 description: The discipline chosen for the event
 *     responses:
 *       '200':
 *         description: Successfully signed up for the event
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Signed up successfully!
 *       '400':
 *         description: No spots available for this event
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: No spots available for this event.
 *       '404':
 *         description: Event not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Event not found
 */
router.post('/olympiks-signup', checkLoggedIn, OlympikEventController.signupForEvent);

/**
 * @swagger
 * /frosh/olympiks-update/{id}:
 *   put:
 *     summary: Update the number of spots available for an Olympik event
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the event to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               maxSpots:
 *                 type: object
 *                 properties:
 *                   MSE:
 *                     type: number
 *                   Mech:
 *                     type: number
 *                   CivMin:
 *                     type: number
 *                   Indy:
 *                     type: number
 *                   TrackOne:
 *                     type: number
 *                   ECE:
 *                     type: number
 *                   EngSci:
 *                     type: number
 *                   Chem:
 *                     type: number
 *               currentSpots:
 *                 type: object
 *                 properties:
 *                   MSE:
 *                     type: number
 *                   Mech:
 *                     type: number
 *                   CivMin:
 *                     type: number
 *                   Indy:
 *                     type: number
 *                   TrackOne:
 *                     type: number
 *                   ECE:
 *                     type: number
 *                   EngSci:
 *                     type: number
 *                   Chem:
 *                     type: number
 *     responses:
 *       '200':
 *         description: Successfully updated the event
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Event updated successfully!
 *                 event:
 *                   type: object
 *                   $ref: '#/components/schemas/OlympikEvent'
 *       '404':
 *         description: Event not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Event not found
 */
router.put(
  '/olympiks-update/:id',
  checkLoggedIn,
  hasAuthScopes(['admin:all']),
  OlympikEventController.updateEventSpots,
);

module.exports = router;
