const express = require('express');
const checkLoggedIn = require('../middlewares/checkLoggedIn');
const hasAuthScopes = require('../middlewares/hasAuthScopes');

const ScuntTeamController = require('../controllers/ScuntTeamController');

const router = express.Router();

// To get judge users use users/scunt-judge-users
// or /scunt-teams/judges (The above isn't returning correct information for some reason)

router.get('/', checkLoggedIn, ScuntTeamController.getTeamPoints);

/**
 * @swagger
 * /scunt-teams/transaction/bribe:
 *   post:
 *     summary: allow a judge to submit a bribe towards a team
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               team:
 *                 type: number
 *                 description: The team to give the points to
 *                 example: 1
 *               points:
 *                 type: number
 *                 description: The amount of points to give
 *                 example: 5
 */
router.post(
  '/transaction/bribe',
  checkLoggedIn,
  hasAuthScopes(['scunt:judge bribe points']),
  ScuntTeamController.bribeTransaction,
);

router.get(
  '/judges',
  checkLoggedIn,
  hasAuthScopes(['scunt:judge missions']),
  ScuntTeamController.getScuntJudges,
);

/**
 * @swagger
 * /scunt-teams/transaction/refill-bribe:
 *   post:
 *     summary: allow an exec to give a judge more bribe points
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               judgeUserId:
 *                 type: string
 *                 description: The id of the judges account
 *                 example: 123456
 *               points:
 *                 type: number
 *                 description: The amount of points to give
 *                 example: 5
 *               isAddPoints:
 *                 type: bool
 *                 description: If true, it will add points to a judges current remaining bribe points, otherwise set it to the 'points' value passed in
 */
router.post(
  '/transaction/refill-bribe',
  checkLoggedIn,
  hasAuthScopes(['scunt:exec refill bribe points']),
  ScuntTeamController.refillBribePoints,
);

/**
 * @swagger
 * /scunt-teams/transaction/add:
 *   post:
 *     summary: allow a judge to add points to a team
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               team:
 *                 type: number
 *                 description: The team to give the points to
 *                 example: 1
 *               missionNumber:
 *                 type: number
 *                 description: The number of the mission
 *                 example: 5
 *               points:
 *                 type: number
 *                 description: The amount of points to give
 *                 example: 100
 */
router.post(
  '/transaction/add',
  checkLoggedIn,
  hasAuthScopes(['scunt:judge missions']),
  ScuntTeamController.addTransaction,
);

router.post(
  '/transactions',
  checkLoggedIn,
  hasAuthScopes(['scunt:exec view transactions']),
  ScuntTeamController.viewTransactions,
);

/**
 * @swagger
 * /scunt-teams/transaction/subtract:
 *   post:
 *     summary: allow a judge to add points to a team
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               team:
 *                 type: number
 *                 description: The team to subtract the points from
 *                 example: 1
 *               points:
 *                 type: number
 *                 description: The amount of points to subtract
 *                 example: 100
 */
router.post(
  '/transaction/subtract',
  checkLoggedIn,
  hasAuthScopes(['scunt:exec negative points']),
  ScuntTeamController.subtractTransaction,
);

/**
 * @swagger
 * /scunt-teams/transaction/check:
 *   post:
 *     summary: returns if a mission has already been completed and assigned points
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               team:
 *                 type: number
 *                 description: The team to give the points to
 *                 example: 1
 *               missionNumber:
 *                 type: number
 *                 description: The number of the mission
 *                 example: 123456
 */
router.post('/transaction/check', checkLoggedIn, ScuntTeamController.checkTransaction);

/**
 * @swagger
 * /scunt-teams/shuffle:
 *   post:
 *     summary: shuffles the teams for scunt
 */
router.post(
  '/shuffle',
  checkLoggedIn,
  hasAuthScopes(['scunt:exec shuffle teams']),
  ScuntTeamController.intializeTeams,
);

module.exports = router;
