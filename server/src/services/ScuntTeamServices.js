/* eslint-disable no-unused-vars */

const ScuntTeamModel = require('../models/ScuntTeamModel');
const LeadurModel = require('../models/LeadurModel');

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

  async bribeTransaction(teamNumber, points, user) {
    return new Promise((resolve, reject) => {
      if (!user.scuntJudgeBribePoints || points > user.scuntJudgeBribePoints) {
        reject('NOT_ENOUGH_BRIBE_POINTS');
      } else {
        LeadurModel.findByIdAndUpdate(
          user.id,
          { $set: { scuntJudgeBribePoints: user.scuntJudgeBribePoints - points } },
          { upsert: false, returnDocument: 'after' },
          (err, leadur) => {
            if (err) {
              reject(err);
            } else if (!leadur) {
              reject('INTERNAL_ERROR');
            } else {
              ScuntTeamModel.findOneAndUpdate(
                { number: teamNumber },
                {
                  $inc: { points },
                  $push: {
                    transactions: [
                      { name: `Bribe from ${user.firstName} ${user.lastName}`, points },
                    ],
                  },
                },
                { upsert: false },
                (err, team) => {
                  if (err) {
                    reject(err);
                  } else if (!team) {
                    reject('INVALID_TEAM_NUMBER');
                  } else {
                    resolve({ team, leadur });
                  }
                },
              );
            }
          },
        );
      }
      // Need to get remaining bribe points of the judge user;
    });
  },

  async refillBribePoints(judgeUserId, points, isAddPoints) {
    return new Promise((resolve, reject) => {
      LeadurModel.findByIdAndUpdate(
        judgeUserId,
        isAddPoints
          ? { $inc: { scuntJudgeBribePoints: points } }
          : { $set: { scuntJudgeBribePoints: points } },
        { upsert: false, returnDocument: 'after' },
        (err, leadur) => {
          if (err) {
            reject(err);
          } else if (!leadur) {
            reject('INVALID_LEADUR_ID');
          } else {
            resolve(leadur);
          }
        },
      );
    });
  },

  async addTransaction(teamName, missionNumber, points) {
    return new Promise((resolve, reject) => {
      ScuntTeamModel.findOne({ name: teamName }, (err, team) => {
        if (err) {
          reject(err);
        } else {
          const prevPoints = team.transactions.reduce((prev, curr) => {
            if (curr.missionNumber === missionNumber && curr.points > prev) {
              prev = curr.points;
            }
            return prev;
          }, 0);
          if (prevPoints < points) {
            team.points += points - prevPoints;
          }
          team.transactions.push({ name: '', missionNumber, points });
        }
      });
      // Get max and min possible points by multiplying missionNumber's mission by minAmountPointsPercent and maxAmountPointsPercent from game settings
      return true;
    });
  },

  async subtractTransaction(teamName, points) {
    return new Promise((resolve, reject) => {
      ScuntTeamModel.findOneAndUpdate(
        { name: teamName },
        { $inc: { points }, $push: { transactions: [{ name: 'Points subtraction', points }] } },
        { upsert: false, returnDocument: 'after' },
        (err, team) => {
          if (err) {
            reject(err);
          } else if (!team) {
            reject('INVALID_TEAM_NAME');
          } else {
            resolve(team);
          }
        },
      );
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
