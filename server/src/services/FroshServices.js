const EmailValidator = require('email-validator');
const bcrypt = require('bcrypt');
const frosh = require('../models/FroshModel');
const FroshModel = frosh.FroshModel;
const FroshGroupModel = require('../models/FroshGroupModel');
const requiredFields = frosh.requiredFields;

const FroshServices = {
  async validateNewFrosh(froshData) {
    for (const field of Object.keys(froshData)) {
      if (requiredFields.includes(field) && (froshData[field] === undefined || froshData[field] === null)) {
        throw new Error('INCOMPLETE_FIELDS');
      }
    }
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

  async hashPassword(password) {
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(password, salt, async(err, hash) => {
        return hash;
      })
    })
  },

  async saveNewFrosh(froshRecord) {
    const newFrosh = FroshModel.create(froshRecord, () => {
      throw new Error('INTERNAL_ERROR');
    })
    const froshGroup = await FroshGroupModel.findOne({name: froshRecord.froshGroup});
    froshGroup.totalNum++;
    froshGroup[froshRecord.discipline]++;
    froshGroup[froshRecord.pronouns]++;
    await froshGroup.save(() => {
      throw new Error('INTERNAL_ERROR')
    })
  }

}

module.exports = FroshServices;
