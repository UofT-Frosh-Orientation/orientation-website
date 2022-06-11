const TimelineServices = require('../services/TimelineServices');

const express = require('express');
const app = express();
app.use(express.static('public'));

const YOUR_DOMAIN = 'http://localhost:5000';

const TimelineController = {
    addTimeline(req, res, next) {
      let timelineData = req.body;
      try {
        await TimelineServices.validateUser(timelineData);
        timelineData.date = timelineData.date;
        timelineData.name = timelineData.name;
        timelineData.description = timelineData.description;
        await TimelineServices.saveNewTimelineElement(timelineData);
        res.status(200).send({ message: 'Successfully added new timeline element!' });
      } catch (e) {
        next(e);
      }
  }
};
