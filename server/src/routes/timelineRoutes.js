const express = require('express');
const checkLoggedIn = require('../middlewares/checkLoggedIn');
const hasAuthScopes = require('../middlewares/hasAuthScopes');
const {
  getTimeline,
  updateTimelineElement,
  createTimelineElement,
  deleteTimelineElement,
} = require('../controllers/TimelineController');
const router = express.Router();

// TODO: check if swagger comments are done correctly (ask Calum?)

/**
 * @swagger
 * /timeline:
 *   get:
 *     summary: Get all the timeline events
 *     responses:
 *       '200':
 *         description: Successfully retrieved the timeline events
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 timelines:
 *                   type: array
 *                   items:
 *                     $ref: '#components/schemas/Timeline'
 */
router.get('/', getTimeline);

/**
 * @swagger
 * /timeline:
 *   post:
 *     summary: Create a new event for the timeline
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#components/schemas/NewTimeline'
 *     responses:
 *       '200':
 *         description: Successfully created new event
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#components/schemas/Timeline'
 *       '403':
 *         $ref: '#components/responses/NotLoggedIn'
 */
router.post('/', checkLoggedIn, hasAuthScopes(['timeline:edit']), createTimelineElement);

/**
 * @swagger
 * /timeline/{timelineId}:
 *   patch:
 *     parameters:
 *       - in: path
 *         name: timelineId
 *         schema:
 *           type: string
 *         required: false
 *         description: id of the timeline event to delete
 *     responses:
 *       '200':
 *         description: The timeline event was successfully deleted
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#components/schemas/Timeline'
 *       '403':
 *         $ref: '#components/responses/NotLoggedIn'
 */
router.put('/:id', checkLoggedIn, hasAuthScopes(['timeline:edit']), updateTimelineElement);

/**
 * @swagger
 * /timeline/{timelineId}:
 *   delete:
 *     parameters:
 *       - in: path
 *         name: timelineId
 *         schema:
 *           type: string
 *         required: true
 *         description: id of the timeline event to delete
 *     responses:
 *       '200':
 *         description: The timeline event was successfully deleted
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#components/schemas/Timeline'
 *       '403':
 *         $ref: '#components/responses/NotLoggedIn'
 */
router.delete('/:id', checkLoggedIn, hasAuthScopes(['timeline:edit']), deleteTimelineElement);

module.exports = router;
