/* eslint-disable no-unused-vars */

const ScuntTeamModel = require('../models/ScuntTeamModel');
const LeadurModel = require('../models/LeadurModel');
const ScuntGameSettingsModel = require('../models/ScuntGameSettingsModel');
const FroshModel = require('../models/FroshModel');

const ScuntTeamServices = {
  async getTeamPoints() {
    //Get amount of teams (Scunt Game Settings) and points for each team
    //Add up and calculate all tranactions for each team
    return new Promise((resolve, reject) => {
      ScuntTeamModel.find({}, { name: 1, number: 1, points: 1 }, {}, (err, teams) => {
        if (err) {
          reject(err);
        } else if (!teams) {
          reject('UNABLE_TO_GET_TEAM_POINTS');
        } else {
          resolve(teams);
        }
      });
    });
  },

  async bribeTransaction(teamNumber, points, user) {
    return new Promise((resolve, reject) => {
      if (!user.scuntJudgeBribePoints || points > user.scuntJudgeBribePoints) {
        reject('NOT_ENOUGH_BRIBE_POINTS');
      } else {
        LeadurModel.findByIdAndUpdate(
          user.id,
          { $set: { scuntJudgeBribePoints: user.scuntJudgeBribePoints - points } },
          { upsert: false, returnDocument: 'after' },
          (err, leadur) => {
            if (err) {
              reject(err);
            } else if (!leadur) {
              reject('INTERNAL_ERROR');
            } else {
              ScuntTeamModel.findOneAndUpdate(
                { number: teamNumber },
                {
                  $inc: { points },
                  $push: {
                    transactions: [
                      { name: `Bribe from ${user.firstName} ${user.lastName}`, points },
                    ],
                  },
                },
                { upsert: false },
                (err, team) => {
                  if (err) {
                    reject(err);
                  } else if (!team) {
                    reject('INVALID_TEAM_NUMBER');
                  } else {
                    resolve({ team, leadur });
                  }
                },
              );
            }
          },
        );
      }
      // Need to get remaining bribe points of the judge user;
    });
  },

  async refillBribePoints(judgeUserId, points, isAddPoints) {
    return new Promise((resolve, reject) => {
      LeadurModel.findByIdAndUpdate(
        judgeUserId,
        isAddPoints
          ? { $inc: { scuntJudgeBribePoints: points } }
          : { $set: { scuntJudgeBribePoints: points } },
        { upsert: false, returnDocument: 'after' },
        (err, leadur) => {
          if (err) {
            reject(err);
          } else if (!leadur) {
            reject('INVALID_LEADUR_ID');
          } else {
            resolve(leadur);
          }
        },
      );
    });
  },

  async addTransaction(teamName, missionNumber, points) {
    return new Promise((resolve, reject) => {
      ScuntTeamModel.findOne({ name: teamName }, (err, team) => {
        if (err) {
          reject(err);
        } else {
          const prevPoints = team.transactions.reduce((prev, curr) => {
            if (curr.missionNumber === missionNumber && curr.points > prev) {
              prev = curr.points;
            }
            return prev;
          }, 0);
          if (prevPoints < points) {
            team.points += points - prevPoints;
          }
          team.transactions.push({ name: '', missionNumber, points });
          team.save((err, res) => {
            if (err) {
              reject(err);
            } else {
              resolve(res);
            }
          });
        }
      });
      // Get max and min possible points by multiplying missionNumber's mission by minAmountPointsPercent and maxAmountPointsPercent from game settings
      return true;
    });
  },

  async subtractTransaction(teamName, points) {
    return new Promise((resolve, reject) => {
      ScuntTeamModel.findOneAndUpdate(
        { name: teamName },
        { $inc: { points }, $push: { transactions: [{ name: 'Points subtraction', points }] } },
        { upsert: false, returnDocument: 'after' },
        (err, team) => {
          if (err) {
            reject(err);
          } else if (!team) {
            reject('INVALID_TEAM_NAME');
          } else {
            resolve(team);
          }
        },
      );
    });
  },

  async checkTransaction(teamName, missionNumber) {
    return new Promise((resolve, reject) => {
      ScuntTeamModel.findOne(
        { name: teamName },
        {
          transactions: {
            $filter: {
              input: '$transactions',
              as: 'transaction',
              cond: { $eq: ['$$transaction.missionNumber', missionNumber] },
            },
          },
        },
        {},
        (err, team) => {
          if (err) {
            reject(err);
          } else if (!team) {
            reject('INVALID_TEAM');
          } else {
            resolve(
              team.transactions.reduce((prev, curr) => {
                if (curr.points > prev) {
                  prev = curr.points;
                }
                return prev;
              }, 0),
            );
          }
        },
      );
    });
  },
  async initializeTeams() {
    /*
    General approach is to:
      1. Get the number of teams from the scunt game settings
      2. Create the correct number of teams and upsert them into mongo
      3. Assign each frosh to a team based off their froshGroup, discipline, and pronouns
    */
    return new Promise((resolve, reject) => {
      ScuntGameSettingsModel.findOne({}, {}, {}, async (err, settings) => {
        if (err) {
          reject(err);
        } else if (!settings || !settings.amountOfTeams) {
          reject('INVALID_OR_MISSING_SCUNT_SETTINGS');
        } else {
          const numTeams = settings.amountOfTeams;
          const teams = [];
          for (let i = 1; i <= numTeams; i++) {
            teams.push({
              number: i,
              name: `Team ${i}`,
              froshGroups: {},
              pronouns: {},
              disciplines: {},
              count: 0,
            });
          }
          // upsert the scunt teams
          ScuntTeamModel.collection.bulkWrite(
            teams.map((t) => ({
              updateOne: {
                filter: {
                  number: t.number,
                },
                update: {
                  $set: {
                    number: t.number,
                    name: t.name,
                    points: 0,
                    transactions: [],
                  },
                },
                upsert: true,
              },
            })),
            {},
            (err) => {
              if (err) {
                reject(err);
              } else {
                FroshModel.find({}, {}, {}, (err, frosh) => {
                  if (err) {
                    reject(err);
                  } else {
                    const maxNum = 85;
                    // create an array of promises to save the updated frosh
                    const updates = frosh.map((f) => {
                      let minScore = 100000;
                      let teamIndex = -1;
                      for (let i = 0; i < teams.length; i++) {
                        const score =
                          0.5 * (teams[i].froshGroups[f.froshGroup] ?? 0) +
                          0.5 * (teams[i].pronouns[f.pronouns] ?? 0) +
                          0.5 * (teams[i].disciplines[f.discipline] ?? 0);
                        if (score < minScore && teams[i].count < maxNum) {
                          minScore = score;
                          teamIndex = i;
                        }
                      }
                      const team = teams[teamIndex];
                      f.scuntTeam = team.number;
                      team.froshGroups[f.froshGroup] = (team.froshGroups[f.froshGroup] ?? 0) + 1;
                      team.pronouns[f.pronouns] = (team.pronouns[f.pronouns] ?? 0) + 1;
                      team.disciplines[f.discipline] = (team.disciplines[f.discipline] ?? 0) + 1;
                      return f.save({ validateModifiedOnly: true });
                    });
                    // await the resolution of the full array, and then resolve only if every frosh saved successfully
                    Promise.all(updates)
                      .then(() => resolve(teams))
                      .catch(() => reject('INTERNAL_ERROR'));
                  }
                });
              }
            },
          );
        }
      });
    });
  },
};

module.exports = ScuntTeamServices;

/* eslint-enable no-unused-vars */
