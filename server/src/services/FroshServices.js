const FroshModel = require('../models/FroshModel');
const FroshGroupModel = require('../models/FroshGroupModel');

const FroshServices = {
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

  async upgradeToFrosh(user, newInfo) {
    console.log(user.userType)
    const frosh = FroshModel.hydrate({...user.toObject(), ...newInfo, userType: 'frosh'})
    frosh.markModified('userType')
    console.log(frosh)
    return await frosh.save()
  }
};

module.exports = FroshServices;
