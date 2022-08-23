const ScuntGameSettingsServices = require('../services/ScuntGameSettingsServices');

const ScuntGameSettingsController = {
  async getGameSettings(req, res, next) {
    try {
      const gameSettings = await ScuntGameSettingsServices.getGameSettings();
      return res.status(200).send({
        message: 'Found game settings',
        settings: gameSettings.map((u) => u.getResponseObject()),
      });
    } catch (e) {
      next(e);
    }
  },

  async setGameSettings(req, res, next) {
    try {
      const {
        name,
        amountOfTeams,
        amountOfStarterBribePoints,
        maxAmountPointsPercent,
        minAmountPointsPercent,
        revealJudgesAndBribes,
        revealTeams,
        discordLink,
        revealLeaderboard,
        revealMissions,
        allowJudging,
      } = req.body;
      //console.log(req.body);
      await ScuntGameSettingsServices.setGameSettings(
        name,
        amountOfTeams,
        amountOfStarterBribePoints,
        maxAmountPointsPercent,
        minAmountPointsPercent,
        revealJudgesAndBribes,
        revealTeams,
        discordLink,
        revealLeaderboard,
        revealMissions,
        allowJudging,
      );
      const gameSettings = await ScuntGameSettingsServices.getGameSettings();
      return res.status(200).send({
        message: 'Successfully updated Scunt game settings',
        settings: gameSettings.map((u) => u.getResponseObject()),
      });
    } catch (e) {
      next(e);
    }
  },
};

module.exports = ScuntGameSettingsController;
