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

// TODO: add swagger documentation comments in this file

router.get('/', getTimeline);

router.put('/:id', checkLoggedIn, hasAuthScopes(['timeline:edit']), updateTimelineElement);

router.post('/', checkLoggedIn, hasAuthScopes(['timeline:edit']), createTimelineElement);

router.delete('/:id', checkLoggedIn, hasAuthScopes(['timeline:edit']), deleteTimelineElement);

module.exports = router;
