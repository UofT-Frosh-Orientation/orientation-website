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
      const name = req.name;
      const amountOfTeams = req.amountOfTeams;
      const amountOfStarterBribePoints = req.amountOfStarterBribePoints;
      const maxAmountPointsPercent = req.maxAmountPointsPercent;
      const minAmountPointsPercent = req.minAmountPointsPercent;
      const revealTeams = req.revealTeams;
      const discordLink = req.discordLink;
      const revealLeaderboard = req.revealLeaderboard;
      const revealMissions = req.revealMissions;
      const allowJudging = req.allowJudging;
      await ScuntGameSettingsServices.setGameSettings(
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
      );
      return res.status(200).send({ message: 'Successfully updated Scunt game settings' });
    } catch (e) {
      next(e);
    }
  },
};

module.exports = ScuntGameSettingsController;
