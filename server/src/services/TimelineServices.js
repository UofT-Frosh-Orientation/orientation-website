const TimelineModel = require('../models/TimelineModel');

const TimelineServices = {
  async getAllTimelines() {
    return new Promise((resolve, reject) => {
      TimelineModel.find({}).sort({date: 1}).exec(function(err, Timelines) {
        if (err) {
          reject(err);
        } else {
          resolve(Timelines);
        }
      });
    });
  },

  async updateTimelineElement(id, TimelineElement) {
    return new Promise((resolve, reject) => {
      TimelineModel.findOneAndUpdate({ _id: id }, TimelineElement, (err, Timeline) => {
        if (err || !Timeline) {
          reject('UNABLE_TO_UPDATE_TIMELiNE');
        } else {
          resolve(Timeline);
        }
      });
    });
  },

  async saveNewTimelineElement(TimelineElement) {
    return new Promise((resolve, reject) => {
      TimelineModel.create(TimelineElement, (err, newTimeline) => {
        if (err) {
          reject(err);
        } else {
          resolve(newTimeline);
        }
      });
    });
  },

  async deleteTimelineElement(id) {
    return new Promise((resolve, reject) => {
      TimelineModel.findOneAndDelete({ _id: id }, (err, deleteTimeline) => {
        if (err || !deleteTimeline) {
          reject('UNABLE_TO_DELETE_Timeline');
        } else {
          resolve(deleteTimeline);
        }
      });
    });
  },
};

module.exports = TimelineServices;