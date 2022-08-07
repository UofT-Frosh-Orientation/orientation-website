const ScuntMissionModel = require('../models/ScuntMissionModel');

const ScuntMissionServices = {
  async getAllScuntMissions() {
    return new Promise((resolve, reject) => {
      ScuntMissionModel.find({ isHidden: false })
        .sort({ number: 1 })
        .exec(function (err, missions) {
          if (err) {
            reject(err);
          } else {
            resolve(missions);
          }
        });
    });
  },

  async createMission(number, name, category, points, isHidden) {
    return new Promise((resolve, reject) => {
      ScuntMissionModel.create({ number, name, category, points, isHidden }, (err, mission) => {
        if (err) {
          reject(err);
        } else {
          resolve(mission);
        }
      });
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

  async updateMissionVisibility(startMissionNumber, endMissionNumber, isHidden) {
    return new Promise((resolve, reject) => {
      ScuntMissionModel.updateMany(
        { number: { $gte: startMissionNumber, $lt: endMissionNumber } },
        { $set: { isHidden } },
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
