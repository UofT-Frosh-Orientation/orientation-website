const ScuntMissionServices = require('../services/ScuntMissionServices');

const ScuntMissionController = {
  async getMissions(req, res, next) {
    try {
      const { showHidden = false } = req.params;
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
      const number = req.number;
      const name = req.name;
      const category = req.category;
      const points = req.points;
      const isHidden = req.isHidden ? req.isHidden : false;
      await ScuntMissionServices.createMission(number, name, category, points, isHidden);
      return res.status(200).send({
        message: 'Successfully created mission #' + number.toString() + ' - ' + name.toString(),
      });
    } catch (e) {
      next(e);
    }
  },

  async deleteMission(req, res, next) {
    try {
      const number = req.number;
      await ScuntMissionServices.deleteMission(number);
      return res.status(200).send({ message: 'Successfully deleted mission ' + number.toString() });
    } catch (e) {
      next(e);
    }
  },

  async updateMissionVisibility(req, res, next) {
    try {
      const startMissionNumber = req.startMissionNumber;
      const endMissionNumber = req.endMissionNumber;
      const isHidden = req.isHidden;
      await ScuntMissionServices.updateMissionVisibility(
        startMissionNumber,
        endMissionNumber,
        isHidden,
      );
      return res.status(200).send({
        message:
          'Successfully set visibility of missions ' +
          startMissionNumber.toString() +
          ' - ' +
          endMissionNumber.toString() +
          ' to ' +
          (isHidden ? 'hidden' : 'visible'),
      });
    } catch (e) {
      next(e);
    }
  },
};

module.exports = ScuntMissionController;
