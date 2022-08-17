const FroshServices = require('../services/FroshServices');
const UserServices = require('../services/UserServices');
const QrServices = require('../services/QrServices');

const QrController = {
  async getScannedUser(req, res, next) {
    const email = req.body.email;

    try {
      const existingUser = await UserServices.getUserByEmail(email);
      const updateInfo = {
        isPresent: true,
      };

      await FroshServices.updateFroshInfo(existingUser.id, updateInfo);

      return res.status(200).send({ message: 'Frosh has been marked as present' });
    } catch (e) {
      next(e);
    }
  },

  async getSearchedUser(req, res, next) {
    const { search } = req.body;
    try {
      const QrInfo = await QrServices.getSearchedUserData(search);

      return res.status(200).send({ QrInfo });
    } catch (e) {
      next(e);
    }
  },
};

module.exports = QrController;
