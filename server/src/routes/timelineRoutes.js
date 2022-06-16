const express = require('express')
const router = express.Router();
const {
  getTimeline,
  getTimelineElement,
	editTimelineElement,
  addTimelineElement,
  deleteTimelineElement

} = require('../controllers/TimelineController')

router.get('/timeline', getTimeline);


router.get("/timeline/:id", getTimelineElement);

router.post("/timeline/:id/edit", editTimelineElement);

router.put("/timeline/add", addTimelineElement);

router.delete("/timeline/:id/delete", deleteTimelineElement);

router.post("/timeline/changeOrder", changeTimelineOrder);




