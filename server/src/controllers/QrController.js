const FroshServices = require('../services/FroshServices');
const UserServices = require('../services/UserServices');

const QrController = {
  async getScannedUser(req, res, next) {
    try {
      const { email, date, tzOffset } = req.body;
      const day = new Date(Date.parse(date) - tzOffset * 60 * 1000);
      const existingUser = await UserServices.getUserByEmail(email);

      const froshDataFields = req.user?.froshDataFields?.approved;
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
      next(e);
    }
  },
};

module.exports = QrController;
