/* eslint-disable no-unused-vars */

const ScuntTeamModel = require('../models/ScuntTeamModel');

const ScuntTeamServices = {
  async getTeamPoints() {
    //Get amount of teams (Scunt Game Settings) and points for each team
    //Add up and calculate all tranactions for each team
    return new Promise((resolve, reject) => {
      ScuntTeamModel.find({}, { name: 1, number: 1, points: 1 }, {}, (err, teams) => {
        if (err) {
          reject(err);
        } else if (!teams) {
          reject('UNABLE_TO_GET_TEAM_POINTS');
        } else {
          resolve(teams);
        }
      });
    });
  },

  async bribeTransaction(team, points, userId) {
    return new Promise((resolve, reject) => {
      // Need to get remaining bribe points of the judge user;
      return true;
    });
  },

  async refillBribePoints(judgeUserId, points, isAddPoints) {
    return new Promise((resolve, reject) => {
      return true;
    });
  },

  async addTransaction(team, missionNumber, points) {
    return new Promise((resolve, reject) => {
      // Get max and min possible points by multiplying missionNumber's mission by minAmountPointsPercent and maxAmountPointsPercent from game settings
      return true;
    });
  },

  async subtractTransaction(team, points) {
    return new Promise((resolve, reject) => {
      return true;
    });
  },

  async checkTransaction(team, missionNumber) {
    return new Promise((resolve, reject) => {
      return true;
    });
  },
};

module.exports = ScuntTeamServices;

/* eslint-enable no-unused-vars */
