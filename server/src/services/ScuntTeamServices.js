/* eslint-disable no-unused-vars */

const ScuntTeamModel = require('../models/ScuntTeamModel');
const LeadurModel = require('../models/LeadurModel');
const ScuntGameSettingsModel = require('../models/ScuntGameSettingsModel');
const FroshModel = require('../models/FroshModel');
const LeaderboardSubscription = require('../subscribers/leaderboardSubscriber');
const mongoose = require('mongoose');

const ScuntTeamServices = {
  async updateLeaderTeam(userId, teamNumber) {
    return new Promise((resolve, reject) => {
      LeadurModel.findOneAndUpdate(
        { _id: userId },
        { scuntTeam: teamNumber },
        { returnDocument: 'after' },
        (err, Leadur) => {
          if (err || !Leadur) {
            reject('UNABLE_TO_UPDATE_LEADER');
          } else {
            resolve(Leadur);
          }
        },
      );
    });
  },

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

  async getTeams() {
    return new Promise((resolve, reject) => {
      ScuntTeamModel.find({}, { name: 1 }, {}, (err, teams) => {
        if (err) {
          reject(err);
        } else if (!teams) {
          reject('UNABLE_TO_GET_TEAMS');
        } else {
          resolve(teams);
        }
      });
    });
  },

  async calculatePoints(teamNumber, totalPoints) {
    const teams = await ScuntTeamModel.find({}, { name: 1, number: 1, points: 1 }, {}).sort({
      points: -1,
    });

    // finds the rank of the team (i.e., index in teams array)
    const teamPosition = teams.findIndex((t) => teamNumber === t.number);

    return (teamPosition / teams.length) * totalPoints;
  },

  async bribeTransaction(teamNumber, points, user) {
    const curvedPoints = await this.calculatePoints(teamNumber, points);

    return new Promise((resolve, reject) => {
      if (!user.scuntJudgeBribePoints || curvedPoints > user.scuntJudgeBribePoints) {
        reject('NOT_ENOUGH_BRIBE_POINTS');
      } else {
        ScuntGameSettingsModel.findOne({}, (err, settings) => {
          if (err) {
            reject(err);
          } else if (!settings || !settings.allowJudging) {
            reject('INVALID_SETTINGS');
          } else {
            LeadurModel.findByIdAndUpdate(
              user.id,
              { $set: { scuntJudgeBribePoints: user.scuntJudgeBribePoints - curvedPoints } },
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
                      $inc: { curvedPoints },
                      $push: {
                        transactions: [
                          {
                            name: `${curvedPoints.toString()} points bribe from ${user.firstName} ${
                              user.lastName
                            }`,
                            points: curvedPoints,
                          },
                        ],
                      },
                    },
                    { upsert: false, returnDocument: 'after' },
                    (err, team) => {
                      if (err) {
                        reject(err);
                      } else if (!team) {
                        reject('INVALID_TEAM_NUMBER');
                      } else {
                        LeaderboardSubscription.add({ team: team.number, score: team.points });
                        resolve({ team, leadur });
                      }
                    },
                  );
                }
              },
            );
          }
        });
      }
      // Need to get remaining bribe points of the judge user;
    });
  },

  async getScuntJudges() {
    return new Promise((resolve, reject) => {
      LeadurModel.find(
        {
          $or: [
            { 'authScopes.approved': 'scunt:judge bribe points' },
            { 'authScopes.approved': 'scunt:judge missions' },
          ],
        },
        (err, judgeUsers) => {
          if (err) {
            reject(err);
          } else {
            resolve(judgeUsers);
          }
        },
      );
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

  async addTransaction(teamNumber, missionNumber, points) {
    const curvedPoints = await this.calculatePoints(teamNumber, points);

    return new Promise((resolve, reject) => {
      //TODO look up mission to get amount of points
      ScuntGameSettingsModel.findOne({}, (err, settings) => {
        if (err) {
          reject(err);
        } else if (!settings || !settings.allowJudging) {
          reject('INVALID_SETTINGS');
        } else {
          //Compare with maxAmountPointsPercent and minAmountPointsPercent to ensure within bounds set by game rules
          ScuntTeamModel.findOne({ number: teamNumber }, (err, team) => {
            if (err) {
              reject(err);
            } else {
              const prevPoints = team.transactions.reduce((prev, curr) => {
                if (curr.missionNumber === missionNumber && curr.points > prev) {
                  prev = curr.points;
                }
                return prev;
              }, 0);
              if (prevPoints < curvedPoints) {
                team.points += curvedPoints - prevPoints;
              }
              const name =
                (!prevPoints ? 'Added ' : prevPoints < curvedPoints ? 'Updated to ' : '') +
                curvedPoints.toString() +
                ' points for mission #' +
                missionNumber.toString() +
                ' for team ' +
                teamNumber.toString();
              team.transactions.push({
                name,
                points: curvedPoints,
                missionNumber,
              });
              // TODO: add completed missions here
              team.save((err, res) => {
                if (err) {
                  reject(err);
                } else {
                  LeaderboardSubscription.add({ team: res.number, score: res.points });
                  resolve(name);
                }
              });
            }
          });
        }
      });

      // Get max and min possible points by multiplying missionNumber's mission by minAmountPointsPercent and maxAmountPointsPercent from game settings
      return true;
    });
  },

  async subtractTransaction(teamNumber, points) {
    return new Promise((resolve, reject) => {
      ScuntGameSettingsModel.findOne({}, (err, settings) => {
        if (err) {
          reject(err);
        } else if (!settings || !settings.allowJudging) {
          reject('INVALID_SETTINGS');
        } else {
          ScuntTeamModel.findOneAndUpdate(
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
            (err, team) => {
              if (err) {
                reject(err);
              } else if (!team) {
                reject('INVALID_TEAM_NAME');
              } else {
                LeaderboardSubscription.add({ team: team.number, score: team.points });
                resolve(team);
              }
            },
          );
        }
      });
    });
  },

  async viewTransactions(teamNumber) {
    return new Promise((resolve, reject) => {
      ScuntTeamModel.findOne({ number: teamNumber }, {}, {}, (err, teams) => {
        if (err) {
          reject(err);
        } else if (!teams) {
          reject('UNABLE_TO_GET_TEAM_INFO');
        } else {
          resolve(teams);
        }
      });
    });
  },

  async checkTransaction(teamNumber, missionNumber) {
    return new Promise((resolve, reject) => {
      ScuntTeamModel.findOne(
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
                FroshModel.find({ scunt: true }, {}, {}, (err, frosh) => {
                  if (err) {
                    reject(err);
                  } else {
                    const scuntTeamDict = {};
                    // create an array of promises to save the updated frosh
                    const updates = frosh.map((f) => {
                      if (f.scuntPreferredMembers.length) {
                        let isMatch = true;
                        for (let i = 0; i < f.scuntPreferredMembers.length; i++) {
                          if (f.scuntPreferredMembers[i] !== f.email) {
                            FroshModel.find({ email: f.scuntPreferredMembers[i] }, (err, frosh) => {
                              if (err) {
                                reject(err);
                              } else {
                                // there should only be one user with a particular email so map is not needed
                                const sortedFPreferred = f.scuntPreferredMembers.sort();
                                const sortedFroshPreferred = frosh[0].scuntPreferredMembers.sort();
                                if (sortedFPreferred !== sortedFroshPreferred) {
                                  isMatch = false;
                                }
                              }
                            });
                            if (!isMatch) {
                              break;
                            }
                          }
                        }

                        if (isMatch) {
                          let teamIndex = -1;
                          for (let i = 0; i < f.scuntPreferredMembers.length; i++) {
                            if (f.scuntPreferredMembers[i] !== f.email) {
                              if (scuntTeamDict[f.scuntPreferredMembers[i]] !== undefined) {
                                teamIndex = scuntTeamDict[f.scuntPreferredMembers[i]];
                                break;
                              }
                            }
                          }

                          if (teamIndex === -1) {
                            let minCount = 100000;
                            for (let i = 0; i < teams.length; i++) {
                              if (teams[i].count === 0) {
                                teamIndex = i;
                                break;
                              }
                              if (teams[i].count < minCount) {
                                minCount = teams[i].count;
                                teamIndex = i;
                              }
                            }
                          }

                          const team = teams[teamIndex];
                          f.scuntTeam = team.number;
                          scuntTeamDict[f.email] = teamIndex;
                          team.froshGroups[f.froshGroup] =
                            (team.froshGroups[f.froshGroup] ?? 0) + 1;
                          team.pronouns[f.pronouns] = (team.pronouns[f.pronouns] ?? 0) + 1;
                          team.disciplines[f.discipline] =
                            (team.disciplines[f.discipline] ?? 0) + 1;
                          team.count += 1;
                          return f.save({ validateModifiedOnly: true });
                        }
                      }
                      let minScore = 100000;
                      let teamIndex = -1;
                      for (let i = 0; i < teams.length; i++) {
                        const score =
                          0.5 * (teams[i].froshGroups[f.froshGroup] ?? 0) +
                          0.5 * (teams[i].pronouns[f.pronouns] ?? 0) +
                          0.5 * (teams[i].disciplines[f.discipline] ?? 0) +
                          teams[i].count;

                        if (score < minScore) {
                          minScore = score;
                          teamIndex = i;
                        }
                      }
                      const team = teams[teamIndex];
                      f.scuntTeam = team.number;
                      team.froshGroups[f.froshGroup] = (team.froshGroups[f.froshGroup] ?? 0) + 1;
                      team.pronouns[f.pronouns] = (team.pronouns[f.pronouns] ?? 0) + 1;
                      team.disciplines[f.discipline] = (team.disciplines[f.discipline] ?? 0) + 1;
                      team.count += 1;
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

  async deleteTransaction(teamNumber, id) {
    return new Promise((resolve, reject) => {
      ScuntTeamModel.findOneAndUpdate(
        { number: teamNumber },
        { $pull: { transactions: { _id: { $in: [mongoose.Types.ObjectId(id)] } } } },
        { returnDocument: 'after' },
        (err, team) => {
          if (err) {
            reject(err);
          } else if (!team) {
            reject('INVALID_TEAM');
          } else {
            resolve(true);
          }
        },
      );
    });
  },
  async viewRecentTransactions() {
    return new Promise((resolve, reject) => {
      ScuntTeamModel.aggregate([
        { $project: { transactions: 1, number: 1, name: 1 } },
        { $unwind: { path: '$transactions' } },
        { $sort: { createdAt: 1 } },
        { $limit: 50 },
      ]).exec((err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  },
  async setTeamName(teamNumber, rename) {
    return new Promise((resolve, reject) => {
      ScuntTeamModel.findOneAndUpdate({ number: teamNumber }, { name: rename }, (err, team) => {
        if (err) {
          reject(err);
        } else if (!team) {
          reject('INVALID_TEAM_NUMBER');
        } else {
          resolve({ team });
        }
      });
    });
  },
};

module.exports = ScuntTeamServices;

/* eslint-enable no-unused-vars */
