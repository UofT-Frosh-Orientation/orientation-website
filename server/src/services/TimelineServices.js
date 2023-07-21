const TimelineModel = require('../models/TimelineModel');

const TimelineServices = {
  /**
   * @description Gets all the timeline elements
   * @returns {Timeline[]}
   */
  async getAll() {
    return TimelineModel.find({}).then(
      (result) => result.sort({ date: 1 }),
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
    return TimelineModel.findOneAndUpdate(
      { _id: id },
      { date, eventName, description, link, linkLabel },
      { new: true, returnDocument: 'after' },
    ).then(
      (result) => result,
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
  async deleteTimelineElement(id) {
    return TimelineModel.findOneAndDelete({ _id: id }).then(
      (result) => result,
      (error) => {
        throw new Error('UNABLE_TO_DELETE_TIMELINE', { cause: error });
      },
    );
  },
};

module.exports = TimelineServices;
