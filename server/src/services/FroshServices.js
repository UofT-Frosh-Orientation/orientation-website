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
    return FroshModel.findByIdAndUpdate(userId, updateInfo, {
      new: true,
      returnDocument: 'after',
    }).then(
      (frosh) => {
        if (!frosh) throw new Error('FROSH_NOT_FOUND');
        return frosh;
      },
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
      (frosh) => {
        if (!frosh.length) throw new Error('FROSH_NOT_FOUND');
        return frosh;
      },
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

  /* istanbul ignore next */
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

    const validPronouns = ['Prefer Not to Say', 'he/him', 'she/her', 'they/them', 'Other'];
    const teams = [];

    // Initialize froshGroupList with 0s
    for (let i = 0; i < froshGroupList.length; i++) {
      teams.push({
        name: froshGroupList[i].name,
        icon: froshGroupList[i].icon,
        totalNum: 0,
      });
      validPronouns.forEach((pronoun) => {
        teams[i][pronoun] = 0;
      });
      disciplines.forEach((discipline) => {
        teams[i][discipline] = 0;
        frosh.forEach((curFrosh) => {
          if (
            curFrosh.discipline === discipline &&
            validPronouns.includes(curFrosh.pronouns) &&
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
      if (!validPronouns.includes(curFrosh.pronouns)) {
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

        const index = teams.findIndex((team) => team.name === froshGroup);
        teams[index][pronoun] += 1;
        teams[index][curFrosh.discipline] += 1;
        teams[index].totalNum += 1;
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
    await this.initFroshGroups(teams);
    return reassignedFrom;
  },
};

module.exports = FroshServices;
