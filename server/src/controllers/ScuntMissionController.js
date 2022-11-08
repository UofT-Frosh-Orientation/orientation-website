const ScuntMissionServices = require('../services/ScuntMissionServices');

const ScuntMissionController = {
  async getMissions(req, res, next) {
    try {
      const showHidden = req.query.showHidden === 'true';
      const allMissions = await ScuntMissionServices.getAllScuntMissions(showHidden);
      return res.status(200).send({
        message: 'Found missions!',
        missions: allMissions.map((m) => m.getResponseObject()),
      });
    } catch (e) {
      next(e);
    }
  },

  async createMission(req, res, next) {
    try {
      const {
        name,
        number,
        category,
        points,
        isHidden = false,
        isJudgingStation = false,
      } = req.body;
      await ScuntMissionServices.createMission(
        number,
        name,
        category,
        points,
        isHidden,
        isJudgingStation,
      );
      return res.status(200).send({
        message: 'Successfully created mission #' + number.toString() + ' - ' + name.toString(),
      });
    } catch (e) {
      next(e);
    }
  },

  async deleteMission(req, res, next) {
    try {
      const { id } = req.params;
      await ScuntMissionServices.deleteMission(id);
      return res.status(200).send({ message: `Successfully deleted mission: ${id}` });
    } catch (e) {
      next(e);
    }
  },

  async updateMissionVisibility(req, res, next) {
    try {
      const { startMissionNumber, endMissionNumber, isHidden } = req.body;
      await ScuntMissionServices.updateMissionVisibility(
        startMissionNumber,
        endMissionNumber,
        isHidden,
      );
      return res.status(200).send({
        message: `Successfully set visibility of missions ${startMissionNumber} - ${endMissionNumber} to ${
          isHidden ? 'hidden' : 'visible'
        }`,
      });
    } catch (e) {
      next(e);
    }
  },
  async createMultipleMissions(req, res, next) {
    try {
      const missions = await ScuntMissionServices.createMultipleMissions(
        req.file.buffer.toString(),
      );
      res.status(200).send({ missions });
    } catch (e) {
      next(e);
    }
  },
};

module.exports = ScuntMissionController;
