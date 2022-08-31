const express = require('express');
const checkLoggedIn = require('../middlewares/checkLoggedIn');
const hasAuthScopes = require('../middlewares/hasAuthScopes');
const conditionallyApply = require('../middlewares/conditionallyApply');

const ScuntMissionController = require('../controllers/ScuntMissionController');

const router = express.Router();

router.get(
  '/',
  checkLoggedIn,
  conditionallyApply(
    (req) => req.query.showHidden,
    hasAuthScopes(['scunt:exec show missions', 'scunt:exec hide missions']),
  ),
  ScuntMissionController.getMissions,
);

/**
 * @swagger
 * /scunt-missions:
 *   post:
 *     summary: create a mission
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               number:
 *                 type: number
 *                 description: The missions number
 *                 example: 5
 *               name:
 *                 type: string
 *                 description: The mission's name
 *                 example: "Hello Mission"
 *               category:
 *                 type: string
 *                 description: The mission's category
 *                 example: "Category 1"
 *               points:
 *                 type: number
 *                 description: The mission's number
 *                 example: 50
 *               isHidden:
 *                 type: bool
 *                 description: The mission's number
 *                 example: 50
 */
router.post(
  '/',
  checkLoggedIn,
  hasAuthScopes(['scunt:exec create missions']),
  ScuntMissionController.createMission,
);

/**
 * @swagger
 * /scunt-missions:
 *   delete:
 *     summary: delete a mission
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               number:
 *                 type: number
 *                 description: The mission's number
 *                 example: 5
 */
router.delete(
  '/:id',
  checkLoggedIn,
  hasAuthScopes(['scunt:exec delete missions']),
  ScuntMissionController.deleteMission,
);

/**
 * @swagger
 * /scunt-missions:
 *   post:
 *     summary: Set visibility of range of mission numbers
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               startMissionNumber:
 *                 type: number
 *                 description: The first mission number in a range to change the visibility to
 *                 example: 5
 *               endMissionNumber:
 *                 type: number,
 *                 description: The last mission number in a range to change the visibility to
 *                 example: 10
 *               isHidden:
 *                 type: boolean,
 *                 description: The visibility type to set the range of missions to
 *                 example: true
 */
router.put(
  '/set-visibility',
  checkLoggedIn,
  hasAuthScopes(['scunt:exec show missions']),
  ScuntMissionController.updateMissionVisibility,
);

module.exports = router;
