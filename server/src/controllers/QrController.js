const FroshServices = require('../services/FroshServices');
const UserServices = require('../services/UserServices');

const QrController = {
  async getScannedUser(req, res, next) {
    try {
      const { userID, date, tzOffset } = req.body;
      const day = new Date(Date.parse(date) - tzOffset * 60 * 1000);
      const existingUser = await UserServices.getUserByID(userID);
      const froshDataFields = req.user?.froshDataFields?.approved;
      if (!existingUser) {
        return res.status(404).send({ message: 'This frosh does not exist!', returnedUser: {} });
      }
      const returnedUser = {};

      for (const dataField of froshDataFields) {
        returnedUser[dataField] = existingUser[dataField];
      }

      returnedUser['signInDate'] = existingUser['signInDate'];

      // Update user info AFTER getting existing signInDate
      await FroshServices.updateFroshInfo(existingUser.id, {
        signInDate: day,
      });

      return res.status(200).send({ message: 'Frosh has been marked as present', returnedUser });
    } catch (e) {
      req.log.fatal({
        msg: 'Unable to scan user: user ' + req.user.id,
        e,
        user: req.user.getResponseObject(),
      });
      next(e);
    }
  },
};

module.exports = QrController;
