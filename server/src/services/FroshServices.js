const EmailValidator = require('email-validator');
const bcrypt = require('bcrypt');
const FroshModel = require('../models/FroshModel');
const FroshGroupModel = require('../models/FroshGroupModel');
const newUserSubscription = require('../subscribers/newUserSubscription');

const FroshServices = {
  async validateNewFrosh(froshData) {
    if (!EmailValidator.validate(froshData.email)) {
      throw new Error('INVALID_EMAIL');
    }
    const froshExists = await this.checkFroshExists(froshData.email);
    if (froshExists) {
      throw new Error('DUPLICATE_EMAIL');
    }
  },

  async checkFroshExists(email) {
    return FroshModel.findOne({ email });
  },

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

  hashPassword(password) {
    return bcrypt.hashSync(password, 10);
  },

  async saveNewFrosh(froshRecord) {
    const newFrosh = new FroshModel(froshRecord);
    await newFrosh.save();
    const froshGroup = await FroshGroupModel.findOne({ name: froshRecord.froshGroup });
    froshGroup.totalNum++;
    froshGroup[froshRecord.discipline]++;
    froshGroup[froshRecord.pronouns]++;
    await froshGroup.save();
    await newUserSubscription.add(froshRecord);
  },

  /**
 * Initialize a list of frosh groups with default values into the database
 * @constructor
 * @param {list} groups - List of frosh groups, which may be javascript objects
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