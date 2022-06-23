const TimelineModel = require('../models/TimelineModel');

const TimelineServices = {
  //params timelineElement: [Model Element]
  async updateTimelineElement(id, timelineElement) {
    return await TimelineModel.findOneAndUpdate({_id: id}, timelineElement)
  },
  //params timelineElement: []
  async saveNewTimelineElement(timelineElement) {
    const timelineModel = new TimelineModel(timelineElement);

    return await timelineModel.save();
  },

  async deleteTimelineElement(id) {
    return await TimelineModel.findOneAndDelete({_id: id})
  }
};

module.exports = TimelineServices;