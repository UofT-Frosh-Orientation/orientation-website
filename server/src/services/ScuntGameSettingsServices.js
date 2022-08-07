/* eslint-disable no-unused-vars */

const ScuntGameSettingsModel = require('../models/ScuntGameSettingsModel');

const ScuntGameSettingsServices = {
  async getGameSettings() {
    return true;
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
    return true;
  },
};

module.exports = ScuntGameSettingsServices;

/* eslint-enable no-unused-vars */
