/* eslint-disable no-unused-vars */

const ScuntGameSettingModel = require('../models/ScuntGameSettingsModel');

const ScuntGameSettingsServices = {
  async getGameSettings() {
    //console.log('get scunt game settings');
    return new Promise((resolve, reject) => {
      ScuntGameSettingModel.find({}, (err, settings) => {
        if (err) {
          reject(err);
        } else if (!settings || settings === []) {
          reject('ERROR');
        } else {
          resolve(settings); // return game settings?
        }
      });
    });
  },

  async setGameSettings(
    name,
    amountOfTeams,
    amountOfStarterBribePoints,
    maxAmountPointsPercent,
    minAmountPointsPercent,
    revealTeams,
    discordLink,
    revealLeaderboard,
    revealMissions,
    allowJudging,
  ) {
    return new Promise((resolve, reject) => {
      //console.log('set scunt game settings');
      ScuntGameSettingModel.updateMany(
        {},
        {
          $set: {
            name,
            amountOfTeams,
            amountOfStarterBribePoints,
            maxAmountPointsPercent,
            minAmountPointsPercent,
            revealTeams,
            discordLink,
            revealLeaderboard,
            revealMissions,
            allowJudging,
          },
        },
        function (err, settings) {
          if (err) {
            reject(err);
          } else if (!settings || settings === []) {
            reject('ERROR');
          } else {
            resolve(settings);
          }
        },
      );
      // ScuntGameSettingModel.create(
      //   {
      //     // create a new model with all parameters from schema
      //     name,
      //     amountOfTeams,
      //     amountOfStarterBribePoints,
      //     maxAmountPointsPercent,
      //     minAmountPointsPercent,
      //     revealTeams,
      //     discordLink,
      //     revealLeaderboard,
      //     revealMissions,
      //     allowJudging,
      //   },
      //   (err, settings) => {
      //     // use callback func, to catch errors, else return settings
      //     if (err) {
      //       reject(err);
      //     } else if (!settings || settings === []) {
      //       reject('ERROR');
      //     } else {
      //       resolve(settings);
      //     }
      //   },
      // );
    });
  },
};

module.exports = ScuntGameSettingsServices;

/* eslint-enable no-unused-vars */
