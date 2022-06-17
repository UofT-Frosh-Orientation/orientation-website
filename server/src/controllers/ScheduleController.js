const ScheduleServices = require('../services/ScheduleServices');

const ScheduleController = {
  /**
   * Get an array of schedule objects for a frosh group
   * @param {Object} req
   * @param {Object} res
   * @param {Function} next
   * @return {Object[]}
   */
  async getGroupSchedule(req, res, next) {
    const { froshGroup } = req.body;

    res.status(200).send({ groupSchedule: await ScheduleServices.getGroupSchedule(froshGroup) });
  },

  /**
   * edit a schedule object
   * @param {Object} req
   * @param {Object} res
   * @param {Function} next
   * @return {Object}
   */
  async editSchedule(req, res, next) {
    const { id, froshGroup, events, date } = req.body;
    try {
      res
        .status(200)
        .send({ newSchedule: await ScheduleServices.editSchedule(id, froshGroup, events, date) });
    } catch (e) {
      next(e);
    }
  },

  /**
   * reorder a schedule object
   * @param {Object} req
   * @param {Object} res
   * @param {Function} next
   * @return {Promise<void>}
   */
  async reorderSchedule(req, res, next) {
    const { id, order } = req.body;

    try {
      res.status(200).send({ newSchedule: await ScheduleServices.reorderSchedule(id, order) });
    } catch (e) {
      next(e);
    }
  },

  /**
   * add a schedule object
   * @param {Object} req
   * @param {Object} res
   * @param {Function} next
   * @return {Promise<void>}
   */
  async addSchedule(req, res, next) {
    const { froshGroup, date, events } = req.body;

    try {
      const newSchedule = await ScheduleServices.addSchedule(froshGroup, date, events);
      return res.status(200).send({ schedule: newSchedule });
    } catch (e) {
      next(e);
    }
  },

  /**
   * delete a schedule object
   * @param {Object} req
   * @param {Object} res
   * @param {Function} next
   * @return {Promise<void>}
   */
  async deleteSchedule(req, res, next) {
    const { id } = req.body;

    try {
      const deleted = await ScheduleServices.deleteSchedule(id);
      return res.status(200).send({ schedule: deleted });
    } catch (e) {
      next(e);
    }
  },
};
module.exports = ScheduleController;
