const ScheduleServices = require('../services/ScheduleServices');

const ScheduleController = {
  /**
   * Get an array of events for a frosh group.
   * @param {Object} req
   * @param {Object} res
   * @param {Function} next
   * @return {Object[]}
   */
  async getGroupSchedule(req, res, next) {
    const { froshGroupId } = req.params;
    const schedule = await ScheduleServices.getGroupSchedule(froshGroupId);
    res.status(200).send({ groupSchedule: schedule });
  },

  /**
   * Add an event to a frosh group schedule.
   * @param {Object} req
   * @param {Object} res
   * @param {Function} next
   * @return {Promise<void>}
   */
  async addEvent(req, res, next) {
    const { froshGroupId, date, name, description, endTime } = req.body;

    try {
      const newSchedule = await ScheduleServices.addEvent(
        froshGroupId,
        date,
        name,
        description,
        endTime,
      );
      return res.status(200).send({ schedule: newSchedule });
    } catch (e) {
      next(e);
    }
  },

  /**
   * Edit an event in a schedule.
   * @param {Object} req
   * @param {Object} res
   * @param {Function} next
   * @return {Object}
   */
  async editEvent(req, res, next) {
    const { froshGroupId, eventId, date, name, description, endTime } = req.body;
    try {
      const updatedSchedule = await ScheduleServices.editEvent(
        froshGroupId,
        eventId,
        date,
        name,
        description,
        endTime,
      );
      res.status(200).send({ schedule: updatedSchedule });
    } catch (e) {
      next(e);
    }
  },

  /**
   * Reorder the schedule of a frosh group.
   * @param {Object} req
   * @param {Object} res
   * @param {Function} next
   * @return {Promise<void>}
   */
  async reorderEvents(req, res, next) {
    const { froshGroupId, order } = req.body;

    try {
      const schedule = await ScheduleServices.reorderEvents(froshGroupId, order);
      res.status(200).send({ newSchedule: schedule });
    } catch (e) {
      next(e);
    }
  },

  /**
   * Delete an event from a frosh schedule.
   * @param {Object} req
   * @param {Object} res
   * @param {Function} next
   * @return {Promise<void>}
   */
  async deleteEvent(req, res, next) {
    const { froshGroupId, eventId } = req.params;

    try {
      const deleted = await ScheduleServices.deleteEvent(froshGroupId, eventId);
      return res.status(200).send({ schedule: deleted });
    } catch (e) {
      next(e);
    }
  },
};

module.exports = ScheduleController;
