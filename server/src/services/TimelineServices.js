const TimelineModel = require('../models/TimelineModel');

const TimelineServices = {
  /**
   * @description Gets all the timeline elements
   * @returns {Timeline[]}
   */
  async getAll() {
    return TimelineModel.find({}, null, { sort: { date: 1 } }).then(
      (result) => result,
      (error) => {
        throw new Error('UNABLE_TO_GET_TIMELINE', { cause: error });
      },
    );
  },

  /**
   * @description Updates a timeline element
   * @param {String} id
   * @param {Date} date
   * @param {String} eventName
   * @param {String} description
   * @param {String} link
   * @param {String} linkLabel
   * @returns {Timeline}
   */
  async update(id, date, eventName, description, link, linkLabel) {
    return TimelineModel.findByIdAndUpdate(
      id,
      { date, eventName, description, link, linkLabel },
      { new: true, returnDocument: 'after' },
    ).then(
      (result) => {
        if (!result) throw new Error('TIMELINE_NOT_FOUND');
        return result;
      },
      (error) => {
        throw new Error('UNABLE_TO_UPDATE_TIMELINE', { cause: error });
      },
    );
  },

  /**
   * @description Creates a timeline element
   * @param {Date} date
   * @param {String} eventName
   * @param {String} description
   * @param {String} link
   * @param {String} linkLabel
   * @returns {Timeline}
   */
  async create(date, eventName, description, link, linkLabel) {
    return TimelineModel.create({ date, eventName, description, link, linkLabel }).then(
      (result) => result,
      (error) => {
        throw new Error('UNABLE_TO_CREATE_TIMELINE', { cause: error });
      },
    );
  },

  /**
   * @description Deletes a timeline element
   * @param {String} id timeline element id
   * @returns {Timeline}
   */
  async delete(id) {
    return TimelineModel.findByIdAndDelete(id).then(
      (result) => {
        if (!result) throw new Error('TIMELINE_NOT_FOUND');
        return result;
      },
      (error) => {
        throw new Error('UNABLE_TO_DELETE_TIMELINE', { cause: error });
      },
    );
  },
};

module.exports = TimelineServices;
