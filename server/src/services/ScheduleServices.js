const ScheduleModel = require('../models/ScheduleModel');

const ScheduleServices = {
  /**
   * get a list of schedule objects by frosh group
   * @param {String} group
   * @returns {Object[]}
   */
  async getGroupSchedule(group) {
    return await ScheduleModel.find({  }).exec();
  },
  /**
   *
   * @param {Object} schedule
   * @returns {Promise}
   */
  async addSchedule(froshGroup, date, events) {
    return new Promise((resolve, reject) => {
      ScheduleModel.create({ froshGroup, date, events }, (err, newSchedule) => {
        if (err) {
          reject(err);
        } else {
          resolve(newSchedule);
        }
      });
    });
  },
};

module.exports = ScheduleServices;
