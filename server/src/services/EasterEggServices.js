const EasterEggSubmissionModel = require('../models/EasterEggSubmissionModel');

const EasterEggServices = {
  /**
   * @description Records one easter-egg submission
   * @param {String} prompt which easter egg this came from
   * @param {Object} submission { userId, name, email, scuntTeam, response }
   * @returns {EasterEggSubmission}
   */
  async create(prompt, submission) {
    return EasterEggSubmissionModel.create({ prompt, ...submission }).then(
      (result) => result,
      (error) => {
        // 11000 is Mongo's duplicate-key code — the one-per-user index fired,
        // which the controller turns into a friendly "already submitted".
        if (error?.code === 11000) {
          throw new Error('EASTER_EGG_ALREADY_SUBMITTED', { cause: error });
        }
        throw new Error('UNABLE_TO_CREATE_EASTER_EGG_SUBMISSION', { cause: error });
      },
    );
  },

  /**
   * @description Whether this user has already answered this easter egg
   * @param {String} prompt
   * @param {String} userId
   * @returns {Boolean}
   */
  async hasSubmitted(prompt, userId) {
    return EasterEggSubmissionModel.exists({ prompt, userId }).then(
      (result) => !!result,
      (error) => {
        throw new Error('UNABLE_TO_GET_EASTER_EGG_SUBMISSIONS', { cause: error });
      },
    );
  },

  /**
   * @description Gets every submission for one easter egg, newest first
   * @param {String} prompt
   * @returns {EasterEggSubmission[]}
   */
  async getAllByPrompt(prompt) {
    return EasterEggSubmissionModel.find({ prompt }, null, { sort: { createdAt: -1 } }).then(
      (result) => result,
      (error) => {
        throw new Error('UNABLE_TO_GET_EASTER_EGG_SUBMISSIONS', { cause: error });
      },
    );
  },
};

module.exports = EasterEggServices;
