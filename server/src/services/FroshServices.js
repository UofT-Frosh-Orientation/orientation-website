const FroshModel = require('../models/FroshModel');
const FroshGroupModel = require('../models/FroshGroupModel');
const UserModel = require('../models/UserModel');

const FroshServices = {
  /**
   * Gets the frosh group for a new frosh.
   * @param {String} discipline - the discipline of the frosh
   * @param {String} pronouns -  the pronouns of the frosh
   * @return {Promise<Object>} - the name of the frosh group
   */
  async getNewFroshGroup(discipline, pronouns, froshGroupList) {
    if(froshGroupList === null){
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
   * Upgrades an existing user account to a frosh account.
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

  async addRetreatPayment(user, paymentIntent) {
    return new Promise((resolve, reject) => {
      FroshModel.findByIdAndUpdate(
        user.id,
        {
          $push: {
            payments: [
              {
                item: 'Retreat Ticket',
                paymentIntent: paymentIntent.toString(),
                amountDue: 9500,
              },
            ],
          },
        },
        {},
        (err, user) => {
          if (err) {
            reject(err);
          } else if (!user) {
            reject('INVALID_USER');
          } else {
            resolve(user);
          }
        },
      );
    });
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
   * @param {Array<Object>} groups - List of frosh groups as javascript objects
   */
  async initFroshGroups(groups) {
    return await Promise.all(
      groups.map((group) => {
        return new Promise((resolve, reject) => {
          FroshGroupModel.findOneAndUpdate(
            { name: group.name },
            { ...group },
            { upsert: true },
            (err, result) => {
              if (err) {
                reject(err);
              } else {
                resolve(result);
              }
            },
          );
        });
      }),
    );
  },

  async updateFroshInfo(userId, updateInfo) {
    return new Promise((resolve, reject) => {
      FroshModel.findOneAndUpdate(
        { _id: userId },
        updateInfo,
        { returnDocument: 'after' },
        (err, Frosh) => {
          if (err || !Frosh) {
            reject('UNABLE_TO_UPDATE_FROSH');
          } else {
            resolve(Frosh);
          }
        },
      );
    });
  },

  async getFilteredFroshInfo(query, projection) {
    return new Promise((resolve, reject) => {
      FroshModel.find(
        query,
        { ...projection, isRegistered: 1 },
        { strictQuery: false },
        (err, frosh) => {
          if (err) {
            reject(err);
          } else if (!frosh) {
            reject('INTERNAL_ERROR');
          } else {
            resolve(frosh);
          }
        },
      );
    });
  },

  async getFilteredUserInfo(query, projection) {
    return new Promise((resolve, reject) => {
      UserModel.find(
        query,
        { ...projection, isRegistered: 1 },
        { strictQuery: false },
        (err, frosh) => {
          if (err) {
            reject(err);
          } else if (!frosh) {
            reject('INTERNAL_ERROR');
          } else {
            resolve(frosh);
          }
        },
      );
    });
  },

  async mapFroshUsers(frosh) {   

    // Recreating froshGroupList, to not include the broken ones
    let froshGroupList = await FroshGroupModel.find();
    let disciplines = [
      'Chemical',
      'Civil',
      'Electrical & Computer',
      'Engineering Science',
      'Industrial',
      'Materials',
      'Mechanical',
      'Mineral',
      'Track One (Undeclared)',
    ];
    
    let pronouns = ['Prefer Not to Say', 'he/him', 'she/her', 'they/them', 'Other'];
    let teams = [];
    for(let i = 0 ; i < froshGroupList.length; i++){
      teams.push(froshGroupList[i].name)
      for(discipline in disciplines){
        froshGroupList[i][discipline] = 0;
      }
      for(pronoun in pronouns){
        froshGroupList[i][pronoun] = 0;
      }
    }
    for(curFrosh in frosh){
      if(disciplines.includes(curFrosh.discipline) && pronouns.includes(curFrosh.pronouns)){
        froshGroupList[teams.indexOf(curFrosh.froshGroup)][curFrosh.discipline]++;
        froshGroupList[teams.indexOf(curFrosh.froshGroup)][curFrosh.pronouns]++;
      }
    }


    for(curFrosh in frosh){
      if (curFrosh.pronouns !== undefined && (!pronouns.includes(curFrosh.pronouns)) ) {
        const froshUser = curFrosh;
        const { froshGroup, froshGroupIcon } = await FroshServices.getNewFroshGroup(
          froshUser.discipline,
          froshUser.pronouns,
          froshGroupList,
        );
        await FroshServices.updateFroshInfo(froshUser.id, {froshGroup: froshGroup, froshGroupIcon: froshGroupIcon});
        
      }
    }
  }
};

module.exports = FroshServices;
