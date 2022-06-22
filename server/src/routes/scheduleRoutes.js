const express = require('express');
const checkLoggedIn = require('../middlewares/checkLoggedIn');
const hasAuthScopes = require('../middlewares/hasAuthScopes');

const ScheduleController = require('../controllers/ScheduleController');

const router = express.Router();

/**
 * @swagger
 * /schedule/read/{froshGroupId}:
 *   get:
 *     summary: Read a list of events based on frosh group
 *     parameters:
 *       - in: path
 *         name: froshGroupId
 *         schema:
 *           type: string
 *           example: 62abaed97fb4951f642a8ea9
 *           description: The id of the frosh group document
 *         required: true
 *     responses:
 *       '200':
 *         description: An array of event objects
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 groupSchedule:
 *                   type: array
 *                   items: {
 *                      $ref: '#components/schemas/Event'
 *                   }
 */
router.get(
  '/read/:froshGroupId',
  checkLoggedIn,
  ScheduleController.getGroupSchedule,
);

/**
 * @swagger
 * /schedule/add:
 *   post:
 *     summary: Add a new event object to a frosh groups schedule
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#components/schemas/Event'
 *     responses:
 *       '200':
 *         description: Event was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 groupSchedule:
 *                   type: array
 *                   items: {
 *                      $ref: '#components/schemas/Event'
 *                   }
 */
router.post(
  '/add',
  checkLoggedIn,
  hasAuthScopes(['schedule:add']),
  ScheduleController.addEvent,
);

/**
 * @swagger
 * /schedule/edit:
 *   put:
 *     summary: Edit an exisiting event object
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               froshGroupId:
 *                 type: string
 *                 example: 62abaed97fb4951f642a8ea9
 *                 description: The id of the frosh group document
 *               eventId:
 *                 type: string
 *                 description: The id of the event document
 *                 example: 62b2037a469fab32f1dd5e12
 *               date:
 *                 type: string
 *                 description: Date of the event including starting time
 *                 example: 2022-05-09T14:00:00.000Z
 *               endTime:
 *                 type: string
 *                 example: 2022-05-09T15:00:00.000Z
 *                 description: End time of the event
 *               name:
 *                 type: string
 *                 description: Name of the event
 *                 example: Matriculation
 *               description:
 *                 type: string
 *                 description: Description of the event
 *                 example: lorem ipsum

 *     responses:
 *       '200':
 *         description: Event was successfully edited
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 groupSchedule:
 *                   type: array
 *                   items: {
 *                      $ref: '#components/schemas/Event'
 *                   }
 */
router.put(
  '/edit',
  checkLoggedIn,
  hasAuthScopes(['schedule:edit']),
  ScheduleController.editEvent,
);

/**
 * @swagger
 * /schedule/reorder:
 *   put:
 *     summary: Reorder the events of a frosh group schedule
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               froshGroupId:
 *                 type: string
 *                 example: 62abaed97fb4951f642a8ea9
 *                 description: The id of the frosh group document
 *               order:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     eventId:
 *                       type: string
 *                       description: The id of the event document
 *                       example: 62b2037a469fab32f1dd5e12
 *                       required: true
 *                     date:
 *                       type: date
 *                       description: Date of the event including starting time
 *                       example: 2022-05-09T13:00:00.000Z
 *                       required: true
 *                     endTime:
 *                       type: date
 *                       description: End time of the event
 *                       example: 2022-05-09T14:00:00.000Z
 *                       required: true
 *     responses:
 *       '200':
 *         description: Schedule was successfully reordered
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 groupSchedule:
 *                   type: array
 *                   items: {
 *                      $ref: '#components/schemas/Event'
 *                   }
 */
router.put(
  '/reorder',
  checkLoggedIn,
  hasAuthScopes(['schedule:edit']),
  ScheduleController.reorderEvents,
);

/**
 * @swagger
 * /schedule/delete/{froshGroupId}-{eventId}:
 *   delete:
 *     summary: Delete an event object in a frosh group schedule
 *     parameters:
 *       - in: path
 *         name: froshGroupId
 *         schema:
 *           type: string
 *           example: 62abaed97fb4951f642a8ea9
 *         required: true
 *         description: The id of the frosh group document
 *       - in: path
 *         name: eventId
 *         schema:
 *           type: string
 *           example: 62b2037a469fab32f1dd5e12
 *         required: true
 *         description: The id of the event document
 *     responses:
 *       '200':
 *         description: Event was successfully deleted
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 groupSchedule:
 *                   type: array
 *                   items: {
 *                      $ref: '#components/schemas/Event'
 *                   }
 */
router.delete(
  '/delete/:froshGroupId-:eventId',
  checkLoggedIn,
  hasAuthScopes(['schedule:delete']),
  ScheduleController.deleteEvent,
);

module.exports = router;
