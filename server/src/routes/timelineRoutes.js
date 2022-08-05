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

router.get('/', getTimeline);

router.put('/:id', checkLoggedIn, hasAuthScopes(['timeline:edit']), updateTimelineElement);

router.post('/', checkLoggedIn, hasAuthScopes(['timeline:create']), createTimelineElement);

router.delete('/:id', checkLoggedIn, hasAuthScopes(['timeline:delete']), deleteTimelineElement);

module.exports = router;
