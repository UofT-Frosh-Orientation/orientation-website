const FroshServices = require('../services/FroshServices');
const PaymentServices = require('../services/PaymentServices');

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
      const { url, payment_intent } = await PaymentServices.createCheckoutSession(user.email);
      const frosh = (
        await FroshServices.upgradeToFrosh(user, registrationInfo, payment_intent)
      ).getResponseObject();

      // console.log(result)
      if (frosh) {
        res.status(200).send({ url });
      }
    } catch (e) {
      next(e);
    }
  },
};

module.exports = FroshController;
