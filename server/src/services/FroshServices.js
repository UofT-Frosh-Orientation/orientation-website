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
    return FroshModel.findOne({email});
  },

  async getNewFroshGroup(discipline, pronouns){
    const froshGroupList = await FroshGroupModel.find();
    let minNumber = 10000;
    let minScore = 10000;
    let froshGroup = '';
    let froshGroupIdx = -1;
    for (let i = 0; i < froshGroupList.length; i++) {
      const score = (0.5 * ((froshGroupList[i])[discipline])) + 0.5*((froshGroupList[i])[pronouns]);
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
    const newFrosh = new FroshModel(froshRecord)
    await newFrosh.save();
    const froshGroup = await FroshGroupModel.findOne({name: froshRecord.froshGroup});
    froshGroup.totalNum++;
    froshGroup[froshRecord.discipline]++;
    froshGroup[froshRecord.pronouns]++;
    await froshGroup.save();
    await newUserSubscription.add(froshRecord);
  }

}

module.exports = FroshServices;
