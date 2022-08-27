/* eslint-disable no-unused-vars */

const ScuntGameSettingModel = require('../models/ScuntGameSettingsModel');

const ScuntGameSettingsServices = {
  // default scunt settings set in loaders > mongoLoader.js
  async initScuntGameSettings(settings) {
    console.log('init game settings');
    return new Promise((resolve, reject) => {
      ScuntGameSettingModel.create(
        {
          $set: {
            name: settings.name,
            amountOfTeams: settings.amountOfTeams,
            amountOfStarterBribePoints: settings.amountOfStarterBribePoints,
            maxAmountPointsPercent: settings.maxAmountPointsPercent,
            minAmountPointsPercent: settings.minAmountPointsPercent,
            revealJudgesAndBribes: settings.revealJudgesAndBribes,
            revealTeams: settings.revealTeams,
            showDiscordLink: settings.showDiscordLink,
            revealLeaderboard: settings.revealLeaderboard,
            revealMissions: settings.revealMissions,
            allowJudging: settings.allowJudging,
            disordLink: settings.disordLink,
          },
        },
        (err, result) => {
          if (err) {
            reject(err);
          } else {
            resolve(result);
          }
        },
      );
    });
  },

  async getGameSettings() {
    return new Promise((resolve, reject) => {
      ScuntGameSettingModel.find({}, (err, settings) => {
        if (err) {
          reject(err);
        } else if (!settings || settings === []) {
          reject('ERROR');
        } else {
          resolve(settings); // return game settings
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
    revealJudgesAndBribes,
    revealTeams,
    showDiscordLink,
    discordLink,
    revealLeaderboard,
    revealMissions,
    allowJudging,
  ) {
    return new Promise((resolve, reject) => {
      ScuntGameSettingModel.updateMany(
        {},
        {
          $set: {
            name,
            amountOfTeams,
            amountOfStarterBribePoints,
            maxAmountPointsPercent,
            minAmountPointsPercent,
            revealJudgesAndBribes,
            revealTeams,
            showDiscordLink,
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
    });
  },
};

module.exports = ScuntGameSettingsServices;

/* eslint-enable no-unused-vars */
