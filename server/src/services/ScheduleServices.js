const FroshGroup = require('../models/FroshGroupModel');

const ScheduleServices = {
  /**
   * Get an array of events for a frosh group.
   * @param {String} froshGroupId the id of the frosh group being accessed
   * @returns {Object[]}
   */
  async getGroupSchedule(froshGroupId) {
    const group = await FroshGroup.findById(froshGroupId);

    return group.schedule;
  },

  /**
   * Add an event to a frosh group schedule.
   * @param {String} froshGroupId the id of the frosh group the event is being added to
   * @param {Date} date the date of the event, including the starting time
   * @param {String} name name of the event
   * @param {String} description description of the event
   * @param {Date} endTime the finish date of the event, including time
   * @returns {Object[]}
   */
  async addEvent(froshGroupId, date, name, description, endTime) {
    const group = await FroshGroup.findById(froshGroupId);

    return new Promise((resolve, reject) => {
      group.schedule.push({
        date,
        name,
        description,
        endTime,
      });

      group.save((err, updatedGroup) => {
        if (err) {
          reject(err);
        } else {
          resolve(updatedGroup.schedule);
        }
      });
    });
  },

  /**
   * Edit an exisiting event in a frosh group schedule.
   * @param {String} froshGroupId the id of the frosh group
   * @param {String} eventId the id of the event being edited
   * @param {Date} date the date of the event, including the starting time
   * @param {String} name name of the event
   * @param {String} description description of the event
   * @param {Date} endTime the finish date of the event, including time
   * @returns {Object[]}
   */
  async editEvent(froshGroupId, eventId, date, name, description, endTime) {
    const group = await FroshGroup.findById(froshGroupId);

    const updatedEvent = group.schedule.id(eventId);

    let newInfo = {};

    if (name) newInfo.name = name;
    if (description) newInfo.description = description;
    if (date) newInfo.date = date;
    if (endTime) newInfo.endTime = endTime;

    updatedEvent.set(newInfo);
    await group.save();
    return group.schedule;
  },

  /**
   * Reorder the events of a frosh group schedule.
   * @param {String} froshGroupId the id of the frosh group
   * @param {Object[]} order an array of objects which contain event id, start date, and end date
   * @returns {Object[]}
   */
  async reorderEvents(froshGroupId, order) {
    const group = await FroshGroup.findById(froshGroupId);

    order.map((info) => {
      const updatedEvent = group.schedule.id(info.eventId);

      updatedEvent.set({ date: info.date, endTime: info.endTime });
    });

    await group.save();

    return group.schedule;
  },

  /**
   * Delete an event from a frosh group schedule.
   * @param {String} froshGroupId the id of the frosh group
   * @param {String} eventId the id of the event being deleted
   * @returns {Object[]}
   */
  async deleteEvent(froshGroupId, eventId) {
    const group = await FroshGroup.findById(froshGroupId);

    const deletedEvent = group.schedule.id(eventId);
    deletedEvent.set({ isDeleted: true });
    await group.save();

    return group.schedule;
  },
};

module.exports = ScheduleServices;
