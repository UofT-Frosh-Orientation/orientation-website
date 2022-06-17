const ScheduleModel = require('../models/ScheduleModel');

const ScheduleServices = {
  /**
   * get a list of schedule objects by frosh group
   * @param {String} froshGroup the name of the frosh group
   * @returns {Object[]} array of schedule objects of a frosh group
   */
  async getGroupSchedule(froshGroup) {
    return ScheduleModel.find({ froshGroup }).exec();
  },

  /**
   * Add a new schedule object to the database
   * @param {String} froshGroup name of frosh group the schedule belongs to
   * @param {String} date date of the events
   * @param {Object[]} events an array of events
   * @returns {Object} newly created schedule object
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

  /**
   * Edit a pre existing schedule object
   * @param {String} id the id of the schedule object
   * @param {String} froshGroup new frosh group
   * @param {Object[]} events array of events
   * @param {String} date date of the events
   * @returns {Object} edited schedule object
   */
  async editSchedule(id, froshGroup, events, date) {
    const schedule = await ScheduleModel.findById(id);
    const newSchedule = ScheduleModel.hydrate(schedule.toObject());

    let newInfo = {};

    if (froshGroup) newInfo.froshGroup = froshGroup;
    if (events) newInfo.events = events;
    if (date) newInfo.date = date;

    newSchedule.set(newInfo);
    return await newSchedule.save();
  },

  /**
   * reorder the events of a schedule object
   * @param {String} id id of the schedule object being reordered
   * @param {Number[]} order an array of indecies of events in the position they should be in
   * @returns {Object} the reordered schedule object
   */
  async reorderSchedule(id, order) {
    const schedule = await ScheduleModel.findById(id);
    const newSchedule = ScheduleModel.hydrate(schedule.toObject());

    const newEvents = schedule.toObject().events.map((event, index, elements) => {
      return elements[order[index]];
    });

    newSchedule.set({ events: newEvents });
    return await newSchedule.save();
  },

  /**
   * mark a schedule object as deleted
   * @param {String} id the id of the schedule object being deleted
   * @returns {Object} the deleted schedule object
   */
  async deleteSchedule(id) {
    const schedule = await ScheduleModel.findById(id);
    const newSchedule = ScheduleModel.hydrate(schedule.toObject());

    newSchedule.set({ isDeleted: true });
    return await newSchedule.save();
  },
};

module.exports = ScheduleServices;
