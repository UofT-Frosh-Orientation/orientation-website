const express = require('express')

const {
  getTimeline,
  getTimelineElement,
	updateTimelineElement,
  addTimelineElement,
  deleteTimelineElement

} = require('../controllers/TimelineController')

const router = express.Router();

router.get('/', getTimeline);

router.get("/:id", getTimelineElement);

router.put("/:id/edit", updateTimelineElement);

router.post("/add", addTimelineElement);

router.delete("/:id/delete", deleteTimelineElement);

// router.post("/changeOrder", changeTimelineOrder);

module.exports = router;

