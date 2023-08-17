const FroshModel = require('../models/FroshModel');
const FroshGroupModel = require('../models/FroshGroupModel');
const UserModel = require('../models/UserModel');

const FroshServices = {
  /**
   * @description Gets the frosh group for a new frosh.
   * @param {String} discipline - the discipline of the frosh
   * @param {String} pronouns -  the pronouns of the frosh
   * @return {Promise<Object>} - the name of the frosh group
   */
  async getNewFroshGroup(discipline, pronouns, froshGroupList) {
    if (!froshGroupList) {
      froshGroupList = await FroshGroupModel.find();
    }
    let minNumber = 10000;
    let minScore = 10000;
    let froshGroup = '';
    let froshGroupIcon = '';
    for (let i = 0; i < froshGroupList.length; i++) {
      const score = 0.5 * froshGroupList[i][discipline] + 0.5 * froshGroupList[i][pronouns];
      if (froshGroupList[i].totalNum < minNumber) {
        minNumber = froshGroupList[i].totalNum;
        froshGroup = froshGroupList[i].name;
        froshGroupIcon = froshGroupList[i].icon;
        minScore = score;
      }
      if (froshGroupList[i].totalNum === minNumber && score < minScore) {
        froshGroup = froshGroupList[i].name;
        froshGroupIcon = froshGroupList[i].icon;
        minScore = score;
      }
    }
    return { froshGroup, froshGroupIcon };
  },

  /**
   * @description Upgrades an existing user account to a frosh account.
   * @param {Object} user - the existing user document
   * @param {Object} newInfo - the new info required to register the frosh
   * @param {String} paymentIntent
   * @return {Promise<Object>}
   */
  async upgradeToFrosh(user, newInfo, paymentIntent) {
    const frosh = FroshModel.hydrate(user.toObject());
    const { pronouns, discipline } = newInfo;
    frosh.set({
      ...newInfo,
      userType: 'frosh',
      payments: user.payments
        ? [...user.payments, { item: 'Orientation Ticket', paymentIntent, amountDue: 13000 }]
        : [{ item: 'Orientation Ticket', paymentIntent, amountDue: 13000 }],
    });
    const froshGroup = await FroshGroupModel.findOne({ name: newInfo.froshGroup });
    froshGroup[pronouns]++;
    froshGroup[discipline]++;
    await froshGroup.save();
    return await frosh.save();
  },

  /**
   * @description Adds a payment to the user's payment history for the retreat.
   * @param {User} user current user
   * @param {Payment} paymentIntent Payment object from stripe
   * @returns {User} updated user
   */
  async addRetreatPayment(user, paymentIntent) {
    return FroshModel.findByIdAndUpdate(user.id, {
      $push: {
        payments: [
          {
            item: 'Retreat Ticket',
            paymentIntent: paymentIntent.toString(),
            amountDue: 9500,
          },
        ],
      },
    }).then(
      (frosh) => frosh,
      (error) => {
        throw new Error('UNABLE_TO_ADD_PAYMENT', { cause: error });
      },
    );
  },

  /**
   * @description Gets the frosh info from ID.
   * @param {String} id user id
   * @returns {User}
   */
  async getFroshInfo(id) {
    return FroshModel.findById(id).then(
      (frosh) => frosh,
      (error) => {
        throw new Error('UNABLE_TO_GET_FROSH', { cause: error });
      },
    );
  },

  /**
   * @description Initializes the frosh groups in the database.
   * @param {Object[]} groups an array of frosh groups
   * @returns {FroshGroup[]}
   */
  async initFroshGroups(groups) {
    return Promise.all(
      groups.map((group) => {
        return FroshGroupModel.findOneAndUpdate(
          { name: group.name },
          { ...group },
          { upsert: true },
        ).then(
          (result) => result,
          (error) => {
            throw new Error(`UNABLE_TO_INIT_FROSH_GROUP: ${group.name}`, { cause: error });
          },
        );
      }),
    );
  },

  /**
   * @description Updates the user info.
   * @param {String} userId user id
   * @param {User} updateInfo updated user info
   * @returns {User}
   */
  async updateFroshInfo(userId, updateInfo) {
    return FroshModel.findByIdAndUpdate({ _id: userId }, updateInfo, {
      new: true,
      returnDocument: 'after',
    }).then(
      (frosh) => frosh,
      (error) => {
        throw new Error('UNABLE_TO_UPDATE_FROSH', { cause: error });
      },
    );
  },

  /**
   * @description Gets all frosh matching query.
   * @param {Object} query query object
   * @param {Object} projection projection object
   * @returns {User[]}
   */
  async getFilteredFroshInfo(query, projection) {
    return FroshModel.find(query, { ...projection, isRegistered: 1 }, { strictQuery: false }).then(
      (frosh) => frosh,
      (error) => {
        throw new Error('UNABLE_TO_GET_FROSH', { cause: error });
      },
    );
  },

  /**
   * @description Gets all users matching query.
   * @param {Object} query query object
   * @param {Object} projection projection object
   * @returns {User[]}
   */
  async getFilteredUserInfo(query, projection) {
    return UserModel.find(query, { ...projection, isRegistered: 1 }, { strictQuery: false }).then(
      (user) => user,
      (error) => {
        throw new Error('UNABLE_TO_GET_USER', { cause: error });
      },
    );
  },
};

module.exports = FroshServices;
