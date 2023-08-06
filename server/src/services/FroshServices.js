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
    const froshGroupList = await FroshGroupModel.find();
    const disciplines = [
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

    const pronouns = ['Prefer Not to Say', 'he/him', 'she/her', 'they/them', 'Other'];
    const teams = [];

    // Initialize froshGroupList with 0s
    for (let i = 0; i < froshGroupList.length; i++) {
      teams.push({
        name: froshGroupList[i].name,
        icon: froshGroupList[i].icon,
        totalNum: 0,
      });
      pronouns.forEach((pronoun) => {
        teams[i][pronoun] = 0;
      });
      disciplines.forEach((discipline) => {
        teams[i][discipline] = 0;
        frosh.forEach((curFrosh) => {
          if (
            discipline === curFrosh.discipline &&
            pronouns.includes(curFrosh.pronouns) &&
            curFrosh.froshGroup === froshGroupList[i].name
          ) {
            teams[i][discipline] += 1;
            teams[i][curFrosh.pronouns] += 1;
            teams[i].totalNum += 1;
          }
        });
      });
    }

    // redistribute frosh with bad data and update teams
    const reassignedFrom = [];
    frosh.forEach((curFrosh) => {
      if (!pronouns.includes(curFrosh.pronouns)) {
        let pronoun;
        switch (curFrosh.pronouns) {
          case 'He/Him':
            pronoun = 'he/him';
            break;
          case 'She/Her':
            pronoun = 'she/her';
            break;
          case 'They/Them':
            pronoun = 'they/them';
            break;
          case 'Prefer not to say':
            pronoun = 'Prefer Not to Say';
            break;
          default:
            pronoun = curFrosh.pronouns;
            break;
        }
        let minNumber = 10000;
        let minScore = 10000;
        let froshGroup = '';
        let froshGroupIcon = '';
        for (let i = 0; i < teams.length; i++) {
          const score = 0.5 * teams[i][curFrosh.discipline] + 0.5 * teams[i][pronoun];
          if (teams[i].totalNum < minNumber) {
            minNumber = teams[i].totalNum;
            froshGroup = teams[i].name;
            froshGroupIcon = teams[i].icon;
            minScore = score;
          }
          if (teams[i].totalNum === minNumber && score < minScore) {
            froshGroup = teams[i].name;
            froshGroupIcon = teams[i].icon;
            minScore = score;
          }
        }

        const i = teams.findIndex((team) => team.name === froshGroup);
        teams[i][pronoun] += 1;
        teams[i][curFrosh.discipline] += 1;
        teams[i].totalNum += 1;
        curFrosh.froshGroup = froshGroup;
        curFrosh.froshGroupIcon = froshGroupIcon;
        curFrosh.pronouns = pronoun;
        reassignedFrom.push({
          firstName: curFrosh.firstName,
          lastName: curFrosh.lastName,
          to: froshGroup,
          email: curFrosh.email,
        });
        curFrosh.save();
      }
    });
    return reassignedFrom;
  },
};

module.exports = FroshServices;
