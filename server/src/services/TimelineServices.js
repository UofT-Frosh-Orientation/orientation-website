const TimelineModel = require('../models/TimelineModel');

const TimelineServices = {
  //params timelineElement: [Model Element]
  async updateTimelineElement(timelineElement) {
    await timelineElement.save();
  },
  //params timelineElement: []
  async saveNewTimelineElement(date, name, description) {
    const timelineModel = new TimelineModel({
      date: date,
      name: name,
      description: description,
    });

    return await timelineModel.save();
  },

  async validateUser(timelineData) {

  }
};

module.exports = TimelineServices;