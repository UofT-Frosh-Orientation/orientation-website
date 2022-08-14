/* eslint-disable no-unused-vars */

const ScuntGameSettingsModel = require('../models/ScuntGameSettingsModel');

const ScuntGameSettingsServices = {
  async getGameSettings() {
    return {};
    // return new Promise((resolve, reject) => {
    //   // get functions need to find soemthing in the model....
    //   ScuntGameSettingsModel.find({}) // no parameters for find...
    //     .exec(function (err, settings) {
    //       if (err) {
    //         reject(err);
    //       } else if (!settings || settings === []) {
    //         reject('ERROR');
    //       } else {
    //         resolve(settings); // return game settings?
    //       }
    //     });
    // });
  },

  async setGameSettings(
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
    return {};
  },
  //   return new Promise((resolve, reject) => {
  //     ScuntGameSettingsModel.create(
  //       {
  //         // create a new model with all parameters from schema
  //         amountOfTeams,
  //         amountOfStarterBribePoints,
  //         maxAmountPointsPercent,
  //         minAmountPointsPercent,
  //         revealTeams,
  //         discordLink,
  //         revealLeaderboard,
  //         revealMissions,
  //         allowJudging,
  //       },
  //       (err, settings) => {
  //         // use callback func, to catch errors, else return settings
  //         if (err) {
  //           reject(err);
  //         } else {
  //           resolve(settings);
  //         }
  //       },
  //     );
  //   });
  // },
};

module.exports = ScuntGameSettingsServices;

/* eslint-enable no-unused-vars */
