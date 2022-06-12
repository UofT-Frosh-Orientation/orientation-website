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
    let froshGroupIdx = -1;
    for (let i = 0; i < froshGroupList.length; i++) {
      const score = 0.5 * froshGroupList[i][discipline] + 0.5 * froshGroupList[i][pronouns];
      if (froshGroupList[i].totalNum < minNumber) {
        minNumber = froshGroupList[i].totalNum;
        froshGroup = froshGroupList[i].name;
        minScore = score;
        froshGroupIdx = i;
      }
      if (froshGroupList[i].totalNum === minNumber && score < minScore) {
        froshGroup = froshGroupList[i].name;
        minScore = score;
        froshGroupIdx = i;
      }
    }
    return froshGroup;
  },
  /**
   * Upgrades an existing user account to a frosh account.
   * @param {Object} user - the existing user document
   * @param {Object} newInfo - the new info required to register the frosh
   * @return {Promise<Object>}
   */
  async upgradeToFrosh(user, newInfo) {
    const frosh = FroshModel.hydrate(user.toObject());
    frosh.set({ ...newInfo, userType: 'frosh' });
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
      "totalNum": 0,
			"They/Them": 0,
			"He/Him": 0,
			"She/Her": 0,
			"Other": 0,
			"Chemical Engineering": 0,
			"Civil Engineering": 0,
			"Computer Engineering": 0,
			"Electrical Engineering": 0,
			"Engineering Science": 0,
			"Industrial Engineering": 0,
			"Materials Engineering": 0,
			"Mechanical Engineering": 0,
			"Mineral Engineering": 0,
			"Track One (Undeclared)": 0
    }
    try {
      for(const group of groups) {
        FroshGroupModel.create({...defaultVals, ...group})
      }
      res.send({
        status: OK,
        errorMsg: ""
      })
    } catch (err) {
      res.send({
        status: INTERNAL_ERROR,
        errorMsg: "Could not initialize all frosh groups"
      })
    }
  }
};

module.exports = FroshServices;
