const FroshServices = require('../services/FroshServices');
const UserServices = require('../services/UserServices');

const QrController = {
  async getScannedUser(req, res, next) {
    const updateDays = [
      {
        signInSunday: true,
      },
      {
        signInMonday: true,
      },
      {
        signInTuesday: true,
      },
      {
        signInWednesday: true,
      },
      {
        signInThursday: true,
      },
      {
        signInFriday: true,
      },
      {
        signInSaturday: true,
      },
    ];
    try {
      const { email, date, tzOffset } = req.body;
      const day = new Date(Date.parse(date) - tzOffset * 60 * 1000).getDay();
      const existingUser = await UserServices.getUserByEmail(email);
      const updateInfo = updateDays[day];

      await FroshServices.updateFroshInfo(existingUser.id, updateInfo);

      return res.status(200).send({ message: 'Frosh has been marked as present' });
    } catch (e) {
      next(e);
    }
  },
};

module.exports = QrController;
