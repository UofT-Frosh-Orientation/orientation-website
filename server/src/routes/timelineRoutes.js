const express = require('express')
const router = express.Router();
const {
  getTimeline,
  getTimelineElement,
	editTimelineElement,
  addTimelineElement,
  deleteTimelineElement

} = require('../controllers/TimelineController')

// router.post('/timeline', getTimeline);

// router.get("/timeline/:id", getTimelineElement);

// router.get("/timeline/:id/edit", editTimelineElement);

router.get("/timeline/add", addTimelineElement);



