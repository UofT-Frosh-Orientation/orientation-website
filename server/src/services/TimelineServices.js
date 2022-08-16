const TimelineModel = require('../models/TimelineModel');

const TimelineServices = {
  async getAllTimelines() {
    return new Promise((resolve, reject) => {
      TimelineModel.find({})
        .sort({ date: 1 })
        .exec(function (err, Timelines) {
          if (err) {
            reject(err);
          } else {
            resolve(Timelines);
          }
        });
    });
  },

  async updateTimelineElement(id, date, eventName, description, link, linkLabel) {
    return new Promise((resolve, reject) => {
      TimelineModel.findOneAndUpdate(
        { _id: id },
        { date, eventName, description, link, linkLabel },
        (err, Timeline) => {
          if (err || !Timeline) {
            reject('UNABLE_TO_UPDATE_TIMELiNE');
          } else {
            resolve(Timeline);
          }
        },
      );
    });
  },

  async saveNewTimelineElement(date, eventName, description, link, linkLabel) {
    return new Promise((resolve, reject) => {
      TimelineModel.create(
        { date, eventName, description, link, linkLabel },
        (err, newTimeline) => {
          if (err) {
            reject(err);
          } else {
            resolve(newTimeline);
          }
        },
      );
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
