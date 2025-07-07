const FroshModel = require('../models/FroshModel');
const FroshGroupModel = require('../models/FroshGroupModel');
const UserModel = require('../models/UserModel');

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

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
    // let totalReg = 0;
    let lowest = [];
    for (let i = 0; i < froshGroupList.length; i++) {
      const totalCount = await FroshModel.countDocuments({
        froshGroup: froshGroupList[i].name,
        isRegistered: true,
      });
      const disciplineCount = await FroshModel.countDocuments({
        froshGroup: froshGroupList[i].name,
        discipline,
        isRegistered: true,
      });
      const pronounCount = await FroshModel.countDocuments({
        froshGroup: froshGroupList[i].name,
        pronouns,
        isRegistered: true,
      });
      const score = 0.5 * disciplineCount + 0.5 * pronounCount;

      // Output for debugging
      // console.log("Index:", i);
      // console.log("totalCount:", totalCount);
      // console.log("Discipline Count:", disciplineCount);
      // console.log("Pronoun Count:", pronounCount);
      // console.log("Score:", score);
      // totalReg += totalCount;

      if (totalCount < minNumber) {
        minNumber = totalCount;
        minScore = score;
        lowest = [];
      }
      if (totalCount === minNumber) {
        if (score < minScore) {
          minScore = score;
          lowest = [];
        }
        if (score === minScore) {
          lowest.push(i);
        }
      }
    }
    // console.log('Total Registered:', totalReg);
    // console.log('Suitable Groups:', lowest);
    const groupIndex = lowest[getRandomInt(0, lowest.length)];
    // console.log('Selected Group Index:', groupIndex);
    froshGroup = froshGroupList[groupIndex].name;
    froshGroupIcon = froshGroupList[groupIndex].icon;
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
    //   try {
    //     const updatedUser = await UserModel.findByIdAndUpdate(user.id, {
    //       $push: {
    //         payments: [
    //           {
    //             item: 'Retreat Ticket',
    //             paymentIntent: paymentIntent.toString(),
    //             amountDue: 11000,
    //           },
    //         ],
    //       },
    //     }, { new: true});

    //     if (!updatedUser){
    //       throw new Error('user not found');
    //     }

    //     return updatedUser;

    //   } catch (error) {
    //     throw new Error('UNABLE_TO_ADD_PAYMENT', { cause: error });
    //   }
    // },
    return UserModel.findByIdAndUpdate(user.id, {
      $push: {
        payments: [
          {
            item: 'Retreat Ticket',
            paymentIntent: paymentIntent.toString(),
            amountDue: 11000,
          },
        ],
      },
    }).then(
      (user) => user,
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
      (user) => {
        if (!user.length) throw new Error('USERS_NOT_FOUND');
        return user;
      },
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

    const validPronouns = ['Prefer Not to Say', 'He/Him', 'She/Her', 'They/Them', 'Other'];
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
          case 'he/him':
            pronoun = 'He/Him';
            break;
          case 'she/her':
            pronoun = 'She/Her';
            break;
          case 'they/them':
            pronoun = 'They/Them';
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
