const EasterEggSubmissionModel = require('../models/EasterEggSubmissionModel');

const EasterEggServices = {
  /**
   * @description Records one easter-egg submission
   * @param {String} prompt which easter egg this came from
   * @param {String} name self-reported hunter name
   * @param {String} email self-reported hunter email
   * @param {String} scuntTeam self-reported Skule Hunt team number
   * @param {String} response what the hunter typed
   * @returns {EasterEggSubmission}
   */
  async create(prompt, name, email, scuntTeam, response) {
    return EasterEggSubmissionModel.create({ prompt, name, email, scuntTeam, response }).then(
      (result) => result,
      (error) => {
        throw new Error('UNABLE_TO_CREATE_EASTER_EGG_SUBMISSION', { cause: error });
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
