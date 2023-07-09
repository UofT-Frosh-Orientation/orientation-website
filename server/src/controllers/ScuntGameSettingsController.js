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
      req.log.fatal({msg: "Unable to retrieve scunt game settings", e});
      next(e);
    }
  },

  async setGameSettings(req, res, next) {
    try {
      console.log(req.body);
      const {
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
      } = req.body;
      const newSettings = await ScuntGameSettingsServices.setGameSettings(
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
      );
      return res.status(200).send({
        message: 'Successfully updated Scunt game settings',
        settings: [newSettings],
      });
    } catch (e) {
      req.log.fatal({msg: "Unable to update scunt game settings", e});
      next(e);
    }
  },
};

module.exports = ScuntGameSettingsController;
