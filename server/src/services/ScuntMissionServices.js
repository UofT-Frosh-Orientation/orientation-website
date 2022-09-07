const ScuntMissionModel = require('../models/ScuntMissionModel');
const ScuntGameSettingsModel = require('../models/ScuntGameSettingsModel');

const ScuntMissionServices = {
  async getAllScuntMissions(showHidden, user) {
    return new Promise((resolve, reject) => {
      ScuntGameSettingsModel.findOne({}, {}, {}, (err1, settings) => {
        if (err1) {
          reject(err1);
        } else if (
          !settings ||
          (!settings.revealMissions &&
            !user.authScopes.approved.includes('scunt:exec show missions'))
        ) {
          reject('INVALID_SETTINGS');
        } else {
          ScuntMissionModel.find(showHidden ? {} : { isHidden: false }) // finds documents with isHidden property set to false
            .sort({ number: 1 }) //  sort by number in ascending order (1)
            .exec(function (err2, missions) {
              // executes query --> callback
              if (err2) {
                // if error occurs while executing, reject --> result is null
                reject(err2);
              } else {
                // else error = null, and result is populated with missions
                resolve(missions);
              }
            });
        }
      });
    });
  },

  async createMission(number, name, category, points, isHidden, isJudgingStation) {
    return new Promise((resolve, reject) => {
      ScuntMissionModel.create(
        { number, name, category, points, isHidden, isJudgingStation },
        (err, mission) => {
          if (err) {
            reject(err);
          } else {
            resolve(mission);
          }
        },
      );
    });
  },

  async createMultipleMissions(csvString) {
    const { data, errors } = parseCsvString(csvString, {
      '#': {
        key: 'number',
        parseFunction: (val) => parseInt(val),
        validator: (val) => Number.isInteger(val) && val >= 0,
        required: true,
        errorMessage: 'The mission number must be a positive integer!',
      },
      Mission: {
        key: 'name',
        parseFunction: (val) => val,
        validator: (val) => val.length > 0,
        required: true,
        errorMessage: 'The mission name must be at least one character!',
      },
      Category: {
        key: 'category',
        parseFunction: (val) => val,
        validator: (val) => val.length > 0,
        required: true,
        errorMessage: 'The mission category must be at least one character!',
      },
      Points: {
        key: 'points',
        parseFunction: (val) => parseInt(val),
        validator: (val) => Number.isInteger(val) && val >= 0,
        required: true,
        errorMessage: 'The mission points must be a positive integer!',
      },
      Hidden: {
        key: 'isHidden',
        parseFunction: (val) => val.toLowerCase() === 'true',
        validator: () => true,
        required: false,
        errorMessage: '',
      },
      'Judging Station?': {
        key: 'isJudgingStation',
        parseFunction: (val) => val.toLowerCase() === 'true',
        validator: () => true,
        required: false,
        errorMessage: '',
      },
    });
    return new Promise((resolve, reject) => {
      if (errors.length > 0) {
        reject(errors);
      }
      ScuntMissionModel.remove({}, (err1) => {
        if (err1) {
          reject(err1);
        }
        // console.log(`Deleted ${deletedCount} missions`);
        ScuntMissionModel.create(data, {}, (err2, result) => {
          if (err2) {
            reject(err2);
          }
          resolve(result);
        });
      });
    });
  },

  async deleteMission(number) {
    return new Promise((resolve, reject) => {
      ScuntMissionModel.findOneAndDelete({ number }, (err, mission) => {
        if (err || !mission) {
          reject('UNABLE_TO_DELETE_MISSION');
        } else {
          resolve(mission);
        }
      });
    });
  },

  async updateMissionVisibility(startMissionNumber, endMissionNumber, isHidden, isJudgingStation) {
    return new Promise((resolve, reject) => {
      ScuntMissionModel.updateMany(
        { number: { $gte: startMissionNumber, $lte: endMissionNumber } },
        { $set: { isHidden, isJudgingStation } },
        { strictQuery: false },
        (err, result) => {
          if (err) {
            console.log(err);
            reject(err);
          } else if (!result) {
            reject('INTERNAL_ERROR');
          } else {
            console.log('result', result);
            resolve(result);
          }
        },
      );
    });
  },

  async getMission(number) {
    return new Promise((resolve, reject) => {
      ScuntMissionModel.findOne({ number }, {}, {}, (err, mission) => {
        if (err) {
          reject(err);
        } else if (!mission || mission.isHidden) {
          reject('MISSION_DOES_NOT_EXIST');
        } else {
          resolve(mission);
        }
      });
    });
  },
};

const parseCsvString = (csvString, mapping, delimiter = ',') => {
  // regex checks for delimiters that are not contained within quotation marks
  const regex = new RegExp(`(?!\\B"[^"]*)${delimiter}(?![^"]*"\\B)`);
  if (csvString.length === 0 || !/\r\b|\r|\n/.test(csvString)) {
    return { data: [] };
  }
  const rows = csvString.split(/\r\n|\r|\n/).filter((elem) => elem !== '');
  const headers = rows[0].split(regex).map((h) => h.replace(/^(["'])(.*)\1$/, '$2'));
  const requiredHeaders = Object.keys(mapping).filter((m) => mapping[m].required);
  const headerErrors = [];
  requiredHeaders.forEach((header) => {
    if (!headers.includes(header)) {
      headerErrors.push({ row: 1, column: header, errorMessage: `Missing header ${header}` });
    }
  });
  if (headerErrors.length > 0) {
    return { data: [], errors: headerErrors };
  }
  const allowedHeaders = Object.keys(mapping);
  const dataRows = rows.slice(1);
  const { data, errors } = dataRows.reduce(
    (previous, row, rowIndex) => {
      const values = row.split(regex);
      const parsedRow = headers.reduce((previousObj, current, index) => {
        if (allowedHeaders.includes(current)) {
          const val = mapping[current].parseFunction(values[index].replace(/^(["'])(.*)\1$/, '$2')); // removes any surrounding quotation marks
          if (mapping[current].validator(val)) {
            previousObj[mapping[current].key] = val;
          } else {
            previous.errors.push({
              row: rowIndex + 2,
              column: current,
              errorMessage: mapping[current].errorMessage,
            });
          }
        }
        return previousObj;
      }, {});
      previous.data.push(parsedRow);
      return previous;
    },
    { data: [], errors: [] },
  );
  return { data, errors };
};

module.exports = ScuntMissionServices;
