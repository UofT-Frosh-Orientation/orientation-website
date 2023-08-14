const ScuntMissionModel = require('../models/ScuntMissionModel');
const ScuntGameSettingsModel = require('../models/ScuntGameSettingsModel');

const ScuntMissionServices = {
  /**
   * @description Gets all the scunt missions
   * @param {Boolean} showHidden
   * @param {User} user
   * @returns {ScuntMission[]}
   */
  async getAllScuntMissions(showHidden, user) {
    return ScuntGameSettingsModel.findOne().then(
      (settings) => {
        if (
          // if settings is null or revealMissions is false and user does not have the required auth scope
          !settings ||
          (!settings.revealMissions &&
            !user.authScopes.approved.includes('scunt:exec show missions'))
        )
          throw new Error('INVALID_SETTINGS');
        // finds documents with isHidden property set to false
        return ScuntMissionModel.find(showHidden ? {} : { isHidden: false }).then(
          (result) => result.sort(), //  sort by number in ascending order (1)
          (error) => {
            throw new Error('UNABLE_TO_GET_SCUNT_MISSIONS', { cause: error });
          },
        );
      },
      (error) => {
        throw new Error('UNABLE_TO_GET_SCUNT_SETTINGS', { cause: error });
      },
    );
  },

  /**
   * @description Creates a scunt mission
   * @param {Number} number
   * @param {String} name
   * @param {String} category
   * @param {Number} points
   * @param {Boolean} isHidden
   * @param {Boolean} isJudgingStation
   * @returns {ScuntMission}
   */
  async create(number, name, category, points, isHidden, isJudgingStation) {
    return ScuntMissionModel.create({
      number,
      name,
      category,
      points,
      isHidden,
      isJudgingStation,
    }).then(
      (mission) => mission,
      (error) => {
        throw new Error('UNABLE_TO_CREATE_MISSION', { cause: error });
      },
    );
  },

  /**
   * @description Create missions from a csv string. NOTE REMOVES ALL OTHER MISSIONS
   * @param {String} csvString
   * @returns {ScuntMission[]}
   */
  async createMultipleMissions(array) {

    return ScuntMissionModel.deleteMany({}).then(
      () => {
        return ScuntMissionModel.create(array).then(
          (result) => result,
          (error) => {
            throw new Error('UNABLE_TO_CREATE_SCUNT_MISSIONS', { cause: error });
          },
        );
      },
      (error) => {
        throw new Error('UNABLE_TO_DELETE_SCUNT_MISSIONS', { cause: error });
      },
    );
  },

  /**
   * @description Deletes a scunt mission
   * @param {String} number
   * @returns {ScuntMission}
   */
  async deleteMission(number) {
    return ScuntMissionModel.findOneAndDelete({ number }).then(
      (mission) => mission,
      (error) => {
        throw new Error('UNABLE_TO_DELETE_MISSION', { cause: error });
      },
    );
  },

  /**
   * @description Updates a scunt mission
   * @param {Number} startMissionNumber
   * @param {Number} endMissionNumber
   * @param {Boolean} isHidden
   * @param {Boolean} isJudgingStation
   * @returns {ScuntMission[]}
   */
  async updateMissionVisibility(startMissionNumber, endMissionNumber, isHidden, isJudgingStation) {
    return ScuntMissionModel.updateMany(
      { number: { $gte: startMissionNumber, $lte: endMissionNumber } },
      { $set: { isHidden, isJudgingStation } },
      { strictQuery: false },
    ).then(
      (missions) => {
        if (!missions) throw new Error('NO_MISSIONS_FOUND');
        return missions;
      },
      (error) => {
        throw new Error('UNABLE_TO_UPDATE_MISSION_VISIBILITY', { cause: error });
      },
    );
  },

  /**
   * @description Gets a scunt mission
   * @param {Number} number
   * @returns {ScuntMission}
   */
  async getMission(number) {
    return ScuntMissionModel.findOne({ number }).then(
      (mission) => {
        if (!mission || mission.isHidden) throw new Error('MISSION_DOES_NOT_EXIST');
        return mission;
      },
      (error) => {
        throw new Error('UNABLE_TO_GET_MISSION', { cause: error });
      },
    );
  },
};

/**
 * @description Parses a csv string into an object
 * @param {String} csvString
 * @param {Object} mapping
 * @param {String} delimiter
 * @returns {Object}
 */
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
