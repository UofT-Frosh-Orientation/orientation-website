const ScuntGameSettingModel = require('../models/ScuntGameSettingsModel');
const ScuntSettingsSubscription = require('../subscribers/scuntGameSettingsSubscription');

const ScuntGameSettingsServices = {
  /**
   * @description Initializes the scunt game settings
   * @returns {Settings}
   */
  async initScuntGameSettings() {
    return ScuntGameSettingModel.findOneAndUpdate({}, {}, { upsert: true, new: true }).then(
      (settings) => settings,
      (error) => {
        throw new Error('UNABLE_TO_GET_SCUNT_SETTINGS', { cause: error });
      },
    );
  },

  /**
   * @description gets the scunt game settings
   * @returns {Settings}
   */
  async getGameSettings() {
    return ScuntGameSettingModel.findOne({}).then(
      (settings) => settings,
      (error) => {
        throw new Error('UNABLE_TO_GET_SCUNT_SETTINGS', { cause: error });
      },
    );
  },

  /**
   * @description sets the scunt game settings
   * @param {String} name
   * @param {Number} amountOfTeams
   * @param {Number} amountOfStarterBribePoints
   * @param {Number} maxAmountPointsPercent
   * @param {Number} minAmountPointsPercent
   * @param {Boolean} revealJudgesAndBribes
   * @param {Boolean} revealTeams
   * @param {Boolean} showDiscordLink
   * @param {String} discordLink
   * @param {Boolean} revealLeaderboard
   * @param {Boolean} revealMissions
   * @param {Boolean} allowJudging
   * @returns {Settings}
   */
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
    return ScuntGameSettingModel.findOneAndUpdate(
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
      { returnDocument: 'after' },
    ).then(
      (settings) => {
        if (!settings) throw new Error('UNABLE_TO_UPDATE_SCUNT_SETTINGS');
        ScuntSettingsSubscription.add(settings);
        return settings;
      },
      (error) => {
        throw new Error('UNABLE_TO_UPDATE_SCUNT_SETTINGS', { cause: error });
      },
    );
  },
};

module.exports = ScuntGameSettingsServices;
