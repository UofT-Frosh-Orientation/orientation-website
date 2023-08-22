const FroshServices = require('../services/FroshServices');
const PaymentServices = require('../services/PaymentServices');
const newFroshSubscription = require('../subscribers/newFroshSubscription');

const FroshController = {
  /**
   * Upgrades the existing user account into a frosh account.
   * @param {Object} req
   * @param {Object} res
   * @param {Function} next
   * @return {Promise<void>}
   */
  async registerFrosh(req, res, next) {
    console.log('Start frosh registration');
    try {
      const user = req.user;
      const registrationInfo = req.body;
      const { froshGroup, froshGroupIcon } = await FroshServices.getNewFroshGroup(
        registrationInfo.discipline,
        registrationInfo.pronouns,
      );
      registrationInfo.froshGroup = froshGroup;
      registrationInfo.froshGroupIcon = froshGroupIcon;
      const { url, payment_intent } = await PaymentServices.createCheckoutSession(user.email);
      const frosh = (
        await FroshServices.upgradeToFrosh(user, registrationInfo, payment_intent)
      ).getResponseObject();
      if (frosh) {
        req.log.info({
          msg: 'Successful frosh registration by user ' + user.id,
          user: user.getResponseObject(),
        });
        newFroshSubscription.add({
          preferredName: user.preferredName,
          email: user.email,
          file: req.file,
        });
        res.status(200).send({ url });
      }
    } catch (e) {
      req.log.fatal({
        msg: 'Unable to register Frosh: user ' + req.user.id,
        e,
        user: req.user.getResponseObject(),
      });
      next(e);
    }
  },

  /**
   * Updates the info of the currently authenticated user.
   * @param {Object} req
   * @param {Object} res
   * @param {Function} next
   * @return {Promise<void>}
   */
  async updateInfo(req, res, next) {
    const userId = req.user.id;
    const updateInfo = req.body;

    try {
      // Protect these fields when a frosh edits their info (just remove it if it exists in the request)
      delete updateInfo['isRegistered'];
      delete updateInfo['isRetreat'];
      delete updateInfo['froshGroupIcon'];
      delete updateInfo['froshGroup'];
      delete updateInfo['scuntTeam'];
      const frosh = await FroshServices.updateFroshInfo(userId, updateInfo);
      return res.status(200).send({
        message: 'Successfully updated Frosh information!',
        user: frosh.getResponseObject(),
      });
    } catch (e) {
      req.log.fatal({
        msg: 'Unable to update frosh info: user ' + req.user.id,
        e,
        user: req.user.getResponseObject(),
      });
      next(e);
    }
  },

  async getFilteredFroshInfo(req, res, next) {
    try {
      if (!req.user?.froshDataFields?.approved?.length) {
        return next(new Error('UNAUTHORIZED'));
      }
      const filter = req.user?.froshDataFields?.approved.reduce(
        (prev, curr) => {
          prev[curr] = 1;
          return prev;
        },
        { _id: 1 },
      );
      const froshGroupFilters = [null];
      const scuntTeamFilters = [null];
      if (req.user?.authScopes?.approved) {
        for (const authScope of req.user.authScopes.approved) {
          if (authScope.includes('froshGroupData:')) {
            froshGroupFilters.push(authScope.replace('froshGroupData:', ''));
          }
          if (authScope.includes('scuntGroupData:')) {
            scuntTeamFilters.push(parseInt(authScope.replace('scuntGroupData:', '')));
          }
        }
      }
      let query = {
        $or: [{ froshGroup: { $in: froshGroupFilters } }, { scuntTeam: { $in: scuntTeamFilters } }],
      };
      const allFroshGroups = req.user?.authScopes?.approved?.includes('froshGroupData:all');
      if (allFroshGroups) {
        query = {};
      }
      const unRegisteredUsers = req.user?.authScopes?.approved?.includes(
        'froshData:unRegisteredUsers',
      );
      if (!unRegisteredUsers) {
        query = { ...query, isRegistered: true };
      }
      const frosh = await FroshServices.getFilteredFroshInfo(query, filter);
      const users = await FroshServices.getFilteredUserInfo(query, filter);
      return res.status(200).send({ frosh, users });
    } catch (e) {
      req.log.fatal({
        msg: 'Unable to get frosh info: user ' + req.user.id,
        e,
        user: req.user.getResponseObject(),
      });
      next(e);
    }
  },

  async searchFrosh(req, res, next) {
    const { searchTerm, fields } = req.body;
    try {
      if (!req.user?.froshDataFields?.approved?.length) {
        return next(new Error('UNAUTHORIZED'));
      }

      const allowedData = fields.reduce(
        (prev, curr) => {
          if (req.user?.froshDataFields?.approved?.includes(curr)) prev[curr] = 1;
          return prev;
        },
        { _id: 1 },
      );

      const query = {
        $or: Object.keys(allowedData).reduce((list, key) => {
          if (key !== '_id') list.push({ [key]: searchTerm });
          return list;
        }, []),
      };
      const frosh = await FroshServices.getFilteredFroshInfo(query, allowedData);

      return res.status(200).send({ frosh });
    } catch (error) {
      next(error);
    }
  },

  async reassignFrosh(req, res, next) {
    try {
      if (!req.user?.froshDataFields?.approved?.length) return next(new Error('UNAUTHORIZED'));

      const filter = req.user?.froshDataFields?.approved.reduce(
        (prev, curr) => {
          prev[curr] = 1;
          return prev;
        },
        { _id: 1 },
      );
      const query = { isRegistered: true };
      const frosh = await FroshServices.getFilteredFroshInfo(query, filter);

      const reassignedFrosh = await FroshServices.mapFroshUsers(frosh);

      return res.status(200).send({ reassignedFrosh });
    } catch (e) {
      req.log.fatal({
        msg: 'Unable to reassign requested frosh users',
        e,
        user: req.user.getResponseObject(),
      });
      next(e);
    }
  },
};

module.exports = FroshController;
