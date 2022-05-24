const FroshServices = require('../services/FroshServices');

const FroshController = {
  async registerFrosh(req, res, next) {
    let froshData = req.body;
    try {
      await FroshServices.validateNewFrosh(froshData);
      froshData.froshGroup = await FroshServices.getNewFroshGroup(froshData.discipline, froshData.pronouns);
      froshData.accountCreatedAt = new Date(Date.now());
      froshData.lastUpdatedAt = new Date(Date.now());
      froshData.balance = 70
      froshData.password = FroshServices.hashPassword(froshData.password);
      await FroshServices.saveNewFrosh(froshData);
      res.status(200).send({'message': "Successfully registered new frosh!"});
    } catch (e) {
      next(e)
    }
  }
}

module.exports = FroshController;
