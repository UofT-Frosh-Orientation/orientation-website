const ScheduleServices = require('../services/ScheduleServices');

const ScheduleController = {
  /**
   * Get an array of schedule objects for a frosh group
   * @param {Object} req
   * @param {Object} res
   * @param {Function} next
   * @return {Promise<void>}
   */
  async getGroupSchedule(req, res, next) {
    const { froshGroup } = req.body;
    const groupSchedule = ScheduleServices.getGroupSchedule(froshGroup);
    res.status(200).send({ groupSchedule });
  },

  /**
   * edit a schedule object
   * @param {Object} req
   * @param {Object} res
   * @param {Function} next
   * @return {Promise<void>}
   */
  async editSchedule(req, res, next) {},

  /**
   * change a schedule object
   * @param {Object} req
   * @param {Object} res
   * @param {Function} next
   * @return {Promise<void>}
   */
  async changeSchedule(req, res, next) {},

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
      return res.status(200).send({ message: 'Success!', schedule: newSchedule });
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
  async deleteSchedule(req, res, next) {},
};
module.exports = ScheduleController;
