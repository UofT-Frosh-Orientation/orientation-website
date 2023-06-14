const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const EmailServices = require('./EmailServices');

const LeadurModel = require('../models/LeadurModel');
const newUserSubscription = require('../subscribers/newUserSubscription');

const LeadurServices = {
  /**
   * Creates a new user with type Leadur.
   * @param {String} email
   * @param {String} password
   * @param {String} firstName
   * @param {String} lastName
   * @param {String} preferredName
   * @param {Number} scuntTeam
   * @return {Promise<unknown>}
   */
  async createLeadur(email, password, firstName, lastName, preferredName, scuntTeam) {
    return new Promise((resolve, reject) => {
      bcrypt
        .hash(password, 10)
        .then((hashedPassword) => {
          LeadurModel.create(
            { email, hashedPassword, firstName, lastName, preferredName, scuntTeam },
            async (err, newUser) => {
              if (err) {
                console.log(err);
                reject(err);
              } else {
                newUserSubscription.add(newUser);
                resolve(newUser);
              }
            },
          );
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  async requestScopesAndData(user, requestedFields, requestedAuthScopes) {
    return new Promise((resolve, reject) => {
      LeadurModel.findByIdAndUpdate(
        user.id,
        {
          'froshDataFields.requested': requestedFields,
          'authScopes.requested': requestedAuthScopes,
        },
        { returnDocument: 'after' },
        (err, leadur) => {
          if (err) {
            reject(err);
          } else if (!leadur) {
            reject('INVALID_USER');
          } else {
            resolve(leadur);
          }
        },
      );
    });
  },
};

module.exports = LeadurServices;
