const ScuntMissionModel = require('../models/ScuntMissionModel');

const ScuntMissionServices = {
  async getAllScuntMissions(showHidden) {
    return new Promise((resolve, reject) => {
      ScuntMissionModel.find(showHidden ? {} : { isHidden: false }) // finds documents with isHidden property set to false
        .sort({ number: 1 }) //  sort by number in ascending order (1)
        .exec(function (err, missions) {
          // executes query --> callback
          if (err) {
            // if error occurs while executing, reject --> result is null
            reject(err);
          } else {
            // else error = null, and result is populated with missions
            resolve(missions);
          }
        });
    });
  },

  async createMission(number, name, category, points, isHidden, isJudgingStation) {
    return new Promise((resolve, reject) => {
      ScuntMissionModel.create(
        { number, name, category, points, isHidden, isJudgingStation },
        (err, mission) => {
          if (err) {
            reject(err);
          } else {
            resolve(mission);
          }
        },
      );
    });
  },

  async deleteMission(number) {
    return new Promise((resolve, reject) => {
      ScuntMissionModel.findOneAndDelete({ number }, (err, mission) => {
        if (err || !mission) {
          reject('UNABLE_TO_DELETE_MISSION');
        } else {
          resolve(mission);
        }
      });
    });
  },

  async updateMissionVisibility(startMissionNumber, endMissionNumber, isHidden, isJudgingStation) {
    return new Promise((resolve, reject) => {
      ScuntMissionModel.updateMany(
        { number: { $gte: startMissionNumber, $lte: endMissionNumber } },
        { $set: { isHidden, isJudgingStation } },
        { strictQuery: false },
        (err, result) => {
          if (err) {
            console.log(err);
            reject(err);
          } else if (!result) {
            reject('INTERNAL_ERROR');
          } else {
            console.log('result', result);
            resolve(result);
          }
        },
      );
    });
  },
};

module.exports = ScuntMissionServices;
