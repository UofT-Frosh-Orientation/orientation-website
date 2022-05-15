const FroshServices = require('../services/FroshServices');

const FroshController = {
  async registerFrosh(req, res, next) {
    let froshData = req.body;
    try {
      await FroshServices.validateNewFrosh(froshData);
      const froshGroup = await FroshServices.getNewFroshGroup(froshData.discipline, froshData.pronouns);
      console.log(froshGroup);
      froshData.froshGroup = froshGroup;
      froshData.accountCreatedAt = new Date(Date.now());
      froshData.lastUpdatedAt = new Date(Date.now());
      const password = FroshServices.hashPassword(froshData.password);
      console.log(`Password: ${password}`);
      froshData.password = password;
      await FroshServices.saveNewFrosh(froshData);
      res.status(200).send({'message': "Successfully registered new frosh!"});
    } catch (e) {
      next(e)
    }
  }
}

module.exports = FroshController;
