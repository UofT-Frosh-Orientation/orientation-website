const ScuntMissionServices = require('../services/ScuntMissionServices');

const ScuntMissionController = {
  async getMissions(req, res, next) {
    try {
      const showHidden = req.query.showHidden === 'true';
      const allMissions = await ScuntMissionServices.getAllScuntMissions(showHidden, req.user);
      return res.status(200).send({
        message: 'Found missions!',
        missions: allMissions.map((m) => m.getResponseObject()),
      });
    } catch (e) {
      req.log.fatal({ msg: 'Unable to get scunt missions', e });
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
      req.log.fatal({ msg: 'Unable to create scunt mission', e });
      next(e);
    }
  },

  async deleteMission(req, res, next) {
    try {
      const { id } = req.params;
      await ScuntMissionServices.deleteMission(id);
      return res.status(200).send({ message: `Successfully deleted mission: ${id}` });
    } catch (e) {
      req.log.fatal({ msg: 'Unable to delete scunt mission ' + id, e });
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
      req.log.fatal({ msg: 'Unable to update mission visibility', e });
      next(e);
    }
  },
  async createMultipleMissions(req, res, next) {
    try {
      console.log(req.array)
      console.log("^ contorller")
      const missions = await ScuntMissionServices.createMultipleMissions(
        req.file.buffer.toString(), req.array
      );
      res.status(200).send({ missions });
    } catch (e) {
      req.log.fatal({ msg: 'Unable to create multiple missions', e });
      next(e);
    }
  },
};

module.exports = ScuntMissionController;
