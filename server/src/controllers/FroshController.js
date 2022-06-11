const FroshServices = require('../services/FroshServices');

const FroshController = {
  /**
   * Upgrades the existing user account into a frosh account.
   * @param {Object} req
   * @param {Object} res
   * @param {Function} next
   * @return {Promise<void>}
   */
  async registerFrosh(req, res, next) {
    try {
      const user = req.user;
      const registrationInfo = req.body;
      registrationInfo.froshGroup = await FroshServices.getNewFroshGroup(
        registrationInfo.discipline,
        registrationInfo.pronouns,
      );
      const frosh = (
        await FroshServices.upgradeToFrosh(user, registrationInfo)
      ).getResponseObject();
      res.status(200).send({ message: 'Successfully registered Frosh!', frosh });
    } catch (e) {
      next(e);
    }
  },
};

module.exports = FroshController;
