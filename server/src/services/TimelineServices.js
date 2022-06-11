const EmailValidator = require('email-validator');
const bcrypt = require('bcrypt');
const TimelineModel = require('../models/FroshModel');

const FroshServices = {
  //params timelineElement: [Model Element]
  async updateTimelineElement(timelineElement) {
    await timelineElement.save();
  },
  //params timelineElement: []
  async saveNewTimelineElement(timelineRecord) {
    const newTimelineElement = new TimelineModel(timelineRecord);
    await newTimelineElement.save();
  },
};

module.exports = FroshServices;