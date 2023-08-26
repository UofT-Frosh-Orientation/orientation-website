const ScuntTeamModel = require('../models/ScuntTeamModel');
const LeadurModel = require('../models/LeadurModel');
const ScuntGameSettingsModel = require('../models/ScuntGameSettingsModel');
const FroshModel = require('../models/FroshModel');
const LeaderboardSubscription = require('../subscribers/leaderboardSubscriber');
const mongoose = require('mongoose');

const ScuntTeamServices = {
  /**
   * @description Updates a Leedurs team
   * @param {String} userId
   * @param {Number} teamNumber
   * @returns {Leadur}
   */
  async updateLeaderTeam(userId, teamNumber) {
    return LeadurModel.findByIdAndUpdate(
      userId,
      { scuntTeam: teamNumber },
      { returnDocument: 'after' },
    ).then(
      (leadur) => {
        if (!leadur) throw new Error('LEADUR_NOT_FOUND');
        return leadur;
      },
      (error) => {
        throw new Error('UNABLE_TO_UPDATE_LEADER', { cause: error });
      },
    );
  },

  /**
   * @description Gets team points
   * @returns {ScuntTeam[]}
   */
  async getTeamPoints() {
    //Get amount of teams (Scunt Game Settings) and points for each team
    //Add up and calculate all tranactions for each team
    return ScuntTeamModel.find({}, { name: 1, number: 1, points: 1 }).then(
      (teams) => {
        if (!teams.length) throw new Error('TEAMS_NOT_FOUND');
        return teams;
      },
      (error) => {
        throw new Error('UNABLE_TO_GET_TEAM_POINTS', { cause: error });
      },
    );
  },

  /**
   * @description Gets teams
   * @returns {ScuntTeam[]}
   */
  async getTeams() {
    return ScuntTeamModel.find({}, { name: 1, number: 1 }).then(
      (teams) => {
        if (!teams.length) throw new Error('TEAMS_NOT_FOUND');
        return teams;
      },
      (error) => {
        throw new Error('UNABLE_TO_GET_TEAMS', { cause: error });
      },
    );
  },

  async calculatePoints(teamNumber, totalPoints) {
    try {
      const teams = await ScuntTeamModel.find(
        {},
        { name: 1, number: 1, points: 1 },
        { sort: { points: -1 } },
      );

      // finds the rank of the team (i.e., index in teams array)
      const teamPosition = teams?.findIndex((t) => teamNumber === t.number) + 1;

      return (teamPosition / teams.length) * totalPoints;
    } catch (error) {
      throw new Error('UNABLE_TO_CALCULATE_POINTS', { cause: error });
    }
  },

  /**
   * @description Adds bribe points to a team
   * @param {Number} teamNumber
   * @param {Number} points
   * @param {User} user
   * @returns {ScuntTeam , Leadur}
   */
  async bribeTransaction(teamNumber, points, user) {
    const curvedPoints = await this.calculatePoints(teamNumber, points);
    if (!user.scuntJudgeBribePoints || curvedPoints > user.scuntJudgeBribePoints)
      throw new Error('NOT_ENOUGH_BRIBE_POINTS');

    await ScuntGameSettingsModel.findOne({}).then(
      (settings) => {
        if (!settings) throw new Error('INVALID_SETTINGS');
        if (!settings.allowJudging) throw new Error('NOT_ALLOWED_TO_JUDGE');
      },
      (error) => {
        throw new Error('UNABLE_TO_GET_SCUNT_SETTINGS', { cause: error });
      },
    );

    const leadur = await LeadurModel.findByIdAndUpdate(
      user.id,
      { $set: { scuntJudgeBribePoints: user.scuntJudgeBribePoints - curvedPoints } },
      { upsert: false, returnDocument: 'after' },
    ).then(
      (leadur) => {
        if (!leadur) throw new Error('LEADUR_NOT_FOUND');
        return leadur;
      },
      (error) => {
        throw new Error('UNABLE_TO_UPDATE_LEADUR', { cause: error });
      },
    );

    return ScuntTeamModel.findOneAndUpdate(
      { number: teamNumber },
      {
        $inc: { points: curvedPoints },
        $push: {
          transactions: [
            {
              name: `${points.toString()} points bribe from ${user.firstName} ${user.lastName}`,
              points: curvedPoints,
            },
          ],
        },
      },
      { upsert: false, returnDocument: 'after' },
    ).then(
      (team) => {
        if (!team) {
          leadur.set({ scuntJudgeBribePoints: user.scuntJudgeBribePoints });
          leadur.save();
          throw new Error('INVALID_TEAM_NUMBER');
        }
        LeaderboardSubscription.add({ team: team.number, score: team.points });
        return { team, leadur };
      },
      (error) => {
        leadur.set({ scuntJudgeBribePoints: user.scuntJudgeBribePoints });
        leadur.save();
        throw new Error('UNABLE_TO_UPDATE_TEAM', { cause: error });
      },
    );
  },

  /**
   * @description Gets all scunt judges
   * @returns {Leadur[]}
   */
  async getScuntJudges() {
    return LeadurModel.find({
      $or: [
        { 'authScopes.approved': 'scunt:judge bribe points' },
        { 'authScopes.approved': 'scunt:judge missions' },
      ],
    }).then(
      (judgeUsers) => {
        if (!judgeUsers.length) throw new Error('JUDGES_NOT_FOUND');
        return judgeUsers;
      },
      (error) => {
        throw new Error('UNABLE_TO_GET_SCUNT_JUDGES', { cause: error });
      },
    );
  },

  /**
   * @description Change a judge's bribe points
   * @param {String} judgeUserId
   * @param {Number} points
   * @param {Boolean} isAddPoints
   * @returns {Leadur}
   */
  async refillBribePoints(judgeUserId, points, isAddPoints) {
    return LeadurModel.findByIdAndUpdate(
      judgeUserId,
      isAddPoints
        ? { $inc: { scuntJudgeBribePoints: points } }
        : { $set: { scuntJudgeBribePoints: points } },
      { upsert: false, returnDocument: 'after' },
    ).then(
      (leadur) => {
        if (!leadur) throw new Error('LEADUR_NOT_FOUND');
        return leadur;
      },
      (error) => {
        throw new Error('UNABLE_TO_UPDATE_LEADUR', { cause: error });
      },
    );
  },

  /**
   * @description Adds a transaction
   * @param {Number} teamNumber
   * @param {Number} missionNumber
   * @param {Number} points
   * @returns {String}
   */
  async addTransaction(teamNumber, missionNumber, points) {
    const curvedPoints = await this.calculatePoints(teamNumber, points);
    // check if judging is allowed
    await ScuntGameSettingsModel.findOne({}).then(
      (settings) => {
        if (!settings) throw new Error('INVALID_SETTINGS');
        if (!settings.allowJudging) throw new Error('NOT_ALLOWED_TO_JUDGE');
      },
      (error) => {
        throw new Error('UNABLE_TO_GET_SCUNT_SETTINGS', { cause: error });
      },
    );

    // check if team exists
    const team = await ScuntTeamModel.findOne({ number: teamNumber }).then(
      (team) => {
        if (!team) throw new Error('INVALID_TEAM_NUMBER');
        return team;
      },
      (error) => {
        throw new Error('UNABLE_TO_GET_TEAM', { cause: error });
      },
    );

    // check if team has already been judged for this mission
    const prevPoints = team.transactions.reduce((prev, curr) => {
      if (curr.missionNumber === missionNumber && curr.points > prev) {
        prev = curr.points;
      }
      return prev;
    }, 0);
    if (prevPoints < curvedPoints) {
      team.points += curvedPoints - prevPoints;
    }

    // add transaction to team
    const transaction =
      (!prevPoints ? 'Added ' : prevPoints < curvedPoints ? 'Updated to ' : '') +
      points.toString() +
      ' points for mission #' +
      missionNumber.toString() +
      ' for team ' +
      teamNumber.toString();
    team.transactions.push({ name: transaction, missionNumber, points: curvedPoints });

    return team.save().then(
      (team) => {
        LeaderboardSubscription.add({ team: team.number, score: team.points });
        return transaction;
      },
      (error) => {
        throw new Error('UNABLE_TO_UPDATE_TEAM', { cause: error });
      },
    );
  },

  /**
   * @description Subtracts points from a team
   * @param {Number} teamNumber
   * @param {Number} points
   * @returns {ScuntTeam}
   */
  async subtractTransaction(teamNumber, points) {
    // check if judging is allowed
    await ScuntGameSettingsModel.findOne({}).then(
      (settings) => {
        if (!settings) throw new Error('INVALID_SETTINGS');
        if (!settings.allowJudging) throw new Error('NOT_ALLOWED_TO_JUDGE');
      },
      (error) => {
        throw new Error('UNABLE_TO_GET_SCUNT_SETTINGS', { cause: error });
      },
    );
    // check if team exists and subtract points
    return ScuntTeamModel.findOneAndUpdate(
      { number: teamNumber },
      {
        $inc: { points: Math.abs(points) * -1 },
        $push: {
          transactions: [
            {
              name: 'Subtracted ' + points.toString() + ' from team ' + teamNumber.toString(),
              points: Math.abs(points) * -1,
            },
          ],
        },
      },
      { upsert: false, returnDocument: 'after' },
    ).then(
      (team) => {
        if (!team) throw new Error('INVALID_TEAM_NUMBER');
        LeaderboardSubscription.add({ team: team.number, score: team.points });
        return team;
      },
      (error) => {
        throw new Error('UNABLE_TO_UPDATE_TEAM', { cause: error });
      },
    );
  },

  /**
   * @description Gets a team's transactions
   * @param {Number} teamNumber
   * @returns {ScuntTeam}
   */
  async viewTransactions(teamNumber) {
    return ScuntTeamModel.findOne({ number: teamNumber }).then(
      (team) => {
        if (!team) throw new Error('INVALID_TEAM_NUMBER');
        return team.transactions;
      },
      (error) => {
        throw new Error('UNABLE_TO_GET_TRANSACTIONS', { cause: error });
      },
    );
  },

  /**
   * @description Gets a team's transactions
   * @param {Number} teamNumber
   * @param {Number} missionNumber
   * @returns {Number}
   */
  async checkTransaction(teamNumber, missionNumber) {
    return ScuntTeamModel.findOne(
      { number: teamNumber },
      {
        transactions: {
          $filter: {
            input: '$transactions',
            as: 'transaction',
            cond: { $eq: ['$$transaction.missionNumber', missionNumber] },
          },
        },
      },
    ).then(
      (team) => {
        if (!team) throw new Error('INVALID_TEAM_NUMBER');
        return team.transactions.reduce((prev, curr) => {
          if (curr.points > prev) {
            prev = curr.points;
          }
          return prev;
        }, 0);
      },
      (error) => {
        throw new Error('UNABLE_TO_GET_TRANSACTIONS', { cause: error });
      },
    );
  },

  /**
   * @description Initializes teams
   * @returns {ScuntTeam[]}
   */
  async initializeTeams() {
    /*
    General approach is to:
      1. Get the number of teams from the scunt game settings
      2. Create the correct number of teams and upsert them into mongo
      3. Assign each frosh to a team based off their froshGroup, discipline, and pronouns
    */
    // get the number of teams from the scunt game settings
    const numTeams = await ScuntGameSettingsModel.findOne({}).then(
      (settings) => {
        if (!settings) throw new Error('INVALID_SETTINGS');
        if (!settings.amountOfTeams) throw new Error('MISSING_SCUNT_SETTINGS');
        return settings.amountOfTeams;
      },
      (error) => {
        throw new Error('UNABLE_TO_GET_SCUNT_SETTINGS', { cause: error });
      },
    );

    // create an array of teams to upsert
    const teams = [...Array(numTeams).keys()].map((i) => ({
      updateOne: {
        filter: {
          number: i + 1,
        },
        update: {
          $set: {
            number: i + 1,
            name: `Team ${i + 1}`,
            points: 0,
            transactions: [],
          },
        },
        upsert: true,
      },
    }));

    const scuntTeamsStats = [...Array(numTeams)].map((_, index) => ({
      number: index + 1,
      name: `Team ${index + 1}`,
      froshGroups: {},
      pronouns: {},
      disciplines: {},
      count: 0,
    }));

    await ScuntTeamModel.collection.drop();

    // upsert the teams
    await ScuntTeamModel.collection.bulkWrite(teams).then(
      (result) => {
        if (result.upsertedCount !== numTeams) throw new Error('TEAM_COUNT_MISMATCH');
      },
      (error) => {
        throw new Error('UNABLE_TO_CREATE_TEAMS', { cause: error });
      },
    );

    // get all the frosh who signed up for scunt
    const scuntFrosh = await FroshModel.find({ attendingScunt: true }).then(
      (allFroshList) => {
        if (!allFroshList.length) throw new Error('SCUNT_FROSH_NOT_FOUND');
        return allFroshList;
      },
      (error) => {
        throw new Error('UNABLE_TO_GET_ALL_FROSH', { cause: error });
      },
    );

    const scuntTeamDict = {};

    // create an array of promises to save the updated frosh
    return Promise.all(
      scuntFrosh.map(async (currFrosh) => {
        if (currFrosh.scuntPreferredMembers.length) {
          let isMatch = true;
          for (let i = 0; i < currFrosh.scuntPreferredMembers.length; i++) {
            if (currFrosh.scuntPreferredMembers[i] != currFrosh.email) {
              const preferredTeamMember = scuntFrosh.filter(
                (frosh) => frosh.email == currFrosh.scuntPreferredMembers[i],
              )[0];

              if (!preferredTeamMember) {
                isMatch = false;
                break;
              }

              if (
                !currFrosh.scuntPreferredMembers.every((val) =>
                  preferredTeamMember.scuntPreferredMembers.includes(val),
                )
              ) {
                isMatch = false;
                break;
              }
            }
          }

          if (isMatch) {
            let teamIndex = -1;
            for (let i = 0; i < currFrosh.scuntPreferredMembers.length; i++) {
              if (currFrosh.scuntPreferredMembers[i] !== currFrosh.email) {
                if (scuntTeamDict[currFrosh.scuntPreferredMembers[i]] !== undefined) {
                  teamIndex = scuntTeamDict[currFrosh.scuntPreferredMembers[i]];
                  break;
                }
              }
            }

            if (teamIndex === -1) {
              let minCount = 100000;
              for (let i = 0; i < scuntTeamsStats.length; i++) {
                if (scuntTeamsStats[i].count === 0) {
                  teamIndex = i;
                  break;
                }
                if (scuntTeamsStats[i].count < minCount) {
                  minCount = scuntTeamsStats[i].count;
                  teamIndex = i;
                }
              }
            }

            const team = scuntTeamsStats[teamIndex];
            currFrosh.scuntTeam = team.number;
            scuntTeamDict[currFrosh.email] = teamIndex;
            team.froshGroups[currFrosh.froshGroup] =
              (team.froshGroups[currFrosh.froshGroup] ?? 0) + 1;
            team.pronouns[currFrosh.pronouns] = (team.pronouns[currFrosh.pronouns] ?? 0) + 1;
            team.disciplines[currFrosh.discipline] =
              (team.disciplines[currFrosh.discipline] ?? 0) + 1;
            team.count += 1;
            return await currFrosh.save({ validateModifiedOnly: true });
          }
        }
        let minScore = 100000;
        let teamIndex = -1;
        for (let i = 0; i < scuntTeamsStats.length; i++) {
          const score =
            0.5 * (scuntTeamsStats[i].froshGroups[currFrosh.froshGroup] ?? 0) +
            0.5 * (scuntTeamsStats[i].pronouns[currFrosh.pronouns] ?? 0) +
            0.5 * (scuntTeamsStats[i].disciplines[currFrosh.discipline] ?? 0) +
            scuntTeamsStats[i].count;

          if (score < minScore) {
            minScore = score;
            teamIndex = i;
          }
        }
        const team = scuntTeamsStats[teamIndex];
        currFrosh.scuntTeam = team.number;
        team.froshGroups[currFrosh.froshGroup] = (team.froshGroups[currFrosh.froshGroup] ?? 0) + 1;
        team.pronouns[currFrosh.pronouns] = (team.pronouns[currFrosh.pronouns] ?? 0) + 1;
        team.disciplines[currFrosh.discipline] = (team.disciplines[currFrosh.discipline] ?? 0) + 1;
        team.count += 1;
        return currFrosh.save({ validateModifiedOnly: true }).then(
          (frosh) => frosh,
          (error) => {
            throw new Error('UNABLE_TO_UPDATE_FROSH', { cause: error });
          },
        );
      }),
    );
  },

  /**
   * @description Deletes a transaction
   * @param {Number} teamNumber
   * @param {String} id
   * @returns {ScuntTeam}
   */
  async deleteTransaction(teamNumber, id) {
    return ScuntTeamModel.findOneAndUpdate(
      { number: teamNumber },
      { $pull: { transactions: { _id: { $in: [new mongoose.Types.ObjectId(id)] } } } },
      { returnDocument: 'after' },
    ).then(
      (team) => {
        if (!team) throw new Error('TEAM_NOT_FOUND');
        return team;
      },
      (error) => {
        throw new Error('UNABLE_TO_UPDATE_TEAM', { cause: error });
      },
    );
  },

  /**
   * @description Gets recent transactions
   * @returns {Transaction[]}
   */
  async viewRecentTransactions() {
    return ScuntTeamModel.aggregate([
      { $project: { transactions: 1, number: 1, name: 1 } },
      { $unwind: { path: '$transactions' } },
      { $sort: { createdAt: 1 } },
      { $limit: 50 },
    ]).then(
      (transactions) => {
        if (!transactions.length) throw new Error('TRANSACTIONS_NOT_FOUND');
        return transactions;
      },
      (error) => {
        throw new Error('UNABLE_TO_GET_TRANSACTIONS', { cause: error });
      },
    );
  },

  /**
   * @description Updates a team's name
   * @param {Number} teamNumber
   * @param {String} rename
   * @returns {ScuntTeam}
   */
  async setTeamName(teamNumber, rename) {
    return ScuntTeamModel.findOneAndUpdate(
      { number: teamNumber },
      { name: rename },
      { new: true, returnDocument: 'after' },
    ).then(
      (team) => {
        if (!team) throw new Error('INVALID_TEAM_NUMBER');
        return team;
      },
      (error) => {
        throw new Error('UNABLE_TO_UPDATE_TEAM', { cause: error });
      },
    );
  },
};

module.exports = ScuntTeamServices;
