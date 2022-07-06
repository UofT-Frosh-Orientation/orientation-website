const FroshModel = require('../models/FroshModel');
const FroshGroupModel = require('../models/FroshGroupModel');

const FroshServices = {
  /**
   * Gets the frosh group for a new frosh.
   * @param {String} discipline - the discipline of the frosh
   * @param {String} pronouns -  the pronouns of the frosh
   * @return {Promise<String>} - the name of the frosh group
   */
  async getNewFroshGroup(discipline, pronouns) {
    const froshGroupList = await FroshGroupModel.find();
    let minNumber = 10000;
    let minScore = 10000;
    let froshGroup = '';
    for (let i = 0; i < froshGroupList.length; i++) {
      const score = 0.5 * froshGroupList[i][discipline] + 0.5 * froshGroupList[i][pronouns];
      if (froshGroupList[i].totalNum < minNumber) {
        minNumber = froshGroupList[i].totalNum;
        froshGroup = froshGroupList[i].name;
        minScore = score;
      }
      if (froshGroupList[i].totalNum === minNumber && score < minScore) {
        froshGroup = froshGroupList[i].name;
        minScore = score;
      }
    }
    return froshGroup;
  },
  /**
   * Upgrades an existing user account to a frosh account.
   * @param {Object} user - the existing user document
   * @param {Object} newInfo - the new info required to register the frosh
   * @param {String} paymentIntent
   * @return {Promise<Object>}
   */
  async upgradeToFrosh(user, newInfo, paymentIntent) {
    const frosh = FroshModel.hydrate(user.toObject());
    frosh.set({
      ...newInfo,
      userType: 'frosh',
      payments: [{ item: 'Orientation Ticket', paymentIntent, amountDue: 13000 }],
    });
    return await frosh.save();
  },

  /**
   * Get a frosh by their id
   * @param id
   * @return {Promise<Object>}
   */
  async getFroshInfo(id) {
    return FroshModel.findById(id);
  },

  /**
   * Initializes a list of frosh groups with default values in the database.
   * @constructor
   * @param {groups} groups - List of frosh groups as javascript objects
   */
  async initFroshGroups(groups) {
    const defaultVals = {
      'Prefer Not to Say': 0,
      'he/him': 0,
      'she/her': 0,
      'they/them': 0,
      Other: 0,
      Chemical: 0,
      Civil: 0,
      'Electrical & Computer': 0,
      'Engineering Science': 0,
      Industrial: 0,
      Materials: 0,
      Mechanical: 0,
      Mineral: 0,
      'Track One (Undeclared)': 0,
    };

    for (const group of groups) {
      FroshGroupModel.create({ ...defaultVals, ...group });
    }
  },
};

module.exports = FroshServices;
