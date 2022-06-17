const express = require('express');
const checkLoggedIn = require('../middlewares/checkLoggedIn');
const hasAuthScopes = require('../middlewares/hasAuthScopes');

const ScheduleController = require('../controllers/ScheduleController');

const router = express.Router();

/**
 * @swagger
 * /schedule/read:
 *   get:
 *     summary: read a list of schedule objects based on frosh group
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *              froshGroup:
 *                type: string
 *                example: Kappa
 *     responses:
 *       '200':
 *         description: an array of schedule objects
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 groupSchedule:
 *                   type: array
 *                   items: {
 *                      $ref: '#components/schemas/Schedule'
 *                   }
 */
router.get('/read', checkLoggedIn, ScheduleController.getGroupSchedule);

/**
 * @swagger
 * /schedule/add:
 *   post:
 *     summary: add a new schedule object
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#components/schemas/Schedule'
 *     responses:
 *       '200':
 *         description: Schedule was successfully created
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#components/schemas/Schedule'
 */
router.post('/add', checkLoggedIn, hasAuthScopes(['schedule:add']), ScheduleController.addSchedule);

/**
 * @swagger
 * /schedule/edit:
 *   put:
 *     summary: edit an exisiting schedule object
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *                 example: 62abaed97fb4951f642a8ea9
 *               froshGroup:
 *                 type: string
 *                 description: the frosh group the schedule belongs to
 *                 example: Kappa
 *               date:
 *                 type: string
 *                 description: date of events for the schedule
 *                 example: Monday September 5
 *               events:
 *                 type: array
 *                 description: array of events occuring on the date of schedule
 *                 items:
 *                   type: object
 *                   required:
 *                     - name
 *                     - description
 *                     - time
 *                   properties:
 *                     name:
 *                       type: string
 *                       description: name of the event
 *                       example: Matriculation
 *                     description:
 *                       type: string
 *                       description: description of the event
 *                       example: lorem ipsum
 *                     time:
 *                       type: string
 *                       description: time of the event
 *                       example: 1:00 pm - 2:00pm
 *                 minItems: 1
 *     responses:
 *       '200':
 *         description: Schedule was successfully edited
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#components/schemas/Schedule'
 */
router.put(
  '/edit',
  checkLoggedIn,
  hasAuthScopes(['schedule:edit']),
  ScheduleController.editSchedule,
);

/**
 * @swagger
 * /schedule/reorder:
 *   put:
 *     summary: reorder the events of a schedule object
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *                 example: 62abaed97fb4951f642a8ea9
 *               order:
 *                 type: array
 *                 items:
 *                   type: number
 *                   minimum: 0
 *                   example: [2,1,3,4,0]
 *     responses:
 *       '200':
 *         description: Schedule was successfully reordered
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#components/schemas/Schedule'
 */
router.put(
  '/reorder',
  checkLoggedIn,
  hasAuthScopes(['schedule:edit']),
  ScheduleController.reorderSchedule,
);

/**
 * @swagger
 * /schedule/delete:
 *   delete:
 *     summary: delete a schedule object
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *                 example: 62abaed97fb4951f642a8ea9
 *     responses:
 *       '200':
 *         description: Schedule was successfully deleted
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#components/schemas/Schedule'
 */
router.delete(
  '/delete',
  checkLoggedIn,
  hasAuthScopes(['schedule:delete']),
  ScheduleController.deleteSchedule,
);

module.exports = router;
