const FroshServices = require('../services/FroshServices');
const UserServices = require('../services/UserServices');

const QrController = {
  async getScannedUser(req, res, next) {
    try {
      const { userID } = req.body;
      const existingUser = await UserServices.getUserByID(userID);
      const froshDataFields = req.user?.froshDataFields?.approved;
      if (!existingUser) {
        return res.status(404).send({ message: 'This frosh does not exist!', returnedUser: {} });
      }
      const returnedUser = {};

      for (const dataField of froshDataFields) {
        returnedUser[dataField] = existingUser[dataField];
      }

      return res.status(200).send({ returnedUser });
    } catch (e) {
      req.log.fatal({
        msg: 'Unable to scan user: user ' + req.user.id,
        e,
        user: req.user.getResponseObject(),
      });
      next(e);
    }
  },

  async signInFrosh(req, res, next) {
    const { userID, date, tzOffset } = req.body;
    const day = new Date(Date.parse(date) - tzOffset * 60 * 1000);
    try {
      const [frosh] = await FroshServices.getFilteredFroshInfo(
        { _id: userID, isRegistered: true },
        {
          firstName: 1,
          lastName: 1,
          preferredName: 1,
          pronouns: 1,
          email: 1,
          preKit: 1,
          signInDate: 1,
          shirtSize: 1,
          photograph: 1,
        },
      );

      if (frosh.signInDate) {
        return res.status(200).send({ message: 'Frosh already marked as present', frosh });
      }

      await FroshServices.updateFroshInfo(userID, {
        signInDate: day,
      });

      return res.status(200).send({ message: 'Frosh has been marked as present', frosh });
    } catch (error) {
      next(error);
    }
  },

  async preKitPickUp(req, res, next) {
    const { userID } = req.body;

    try {
      const frosh = (
        await FroshServices.getFilteredFroshInfo(
          { _id: userID, isRegistered: true },
          {
            firstName: 1,
            lastName: 1,
            preferredName: 1,
            pronouns: 1,
            email: 1,
            preKit: 1,
          },
        )
      )[0];

      if (frosh.preKit) {
        return res.status(200).send({ message: 'Pre kit already picked up', frosh });
      }

      await FroshServices.updateFroshInfo(userID, {
        preKit: true,
      });

      return res.status(200).send({ message: 'Pre kit picked up', frosh });
    } catch (error) {
      next(error);
    }
  },

  async getFood(req, res, next) {
    const { userID } = req.body;

    try {
      const [frosh] = await FroshServices.getFilteredFroshInfo(
        { _id: userID },
        {
          firstName: 1,
          lastName: 1,
          preferredName: 1,
          pronouns: 1,
          medicalInfo: 1,
          specficMedicalInfo: 1,
          allergies: 1,
          allergiesOther: 1,
          gotFood: 1,
        },
      );

      if (frosh.gotFood) {
        return res.status(200).send({ message: 'Food already picked up', frosh });
      }

      await FroshServices.updateFroshInfo(userID, {
        gotFood: true,
      });

      return res.status(200).send({ message: 'Food picked up', frosh });
    } catch (error) {
      next(error);
    }
  },
};

module.exports = QrController;
