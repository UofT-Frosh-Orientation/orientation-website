const bcrypt = require('bcrypt');
const EmailValidator = require('email-validator');

const UserModel = require('../models/userModel');
const newUserSubscription = require('../subscribers/newUserSubscription');

const passwordValidator = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})/;

const UserServices = {
  /**
   * Validates the fields for a user.
   * @param {String} email
   * @param {String} password
   * @param {String} name
   * @return {Promise<void>}
   */
  async validateUser(email, password, name) {
    if (name === '' || name === undefined || name === null) {
      throw new Error('MISSING_NAME');
    }
    if (!EmailValidator.validate(email)) {
      throw new Error('INVALID_EMAIL');
    }
    if (!passwordValidator.test(password)) {
      throw new Error('INVALID_PASSWORD');
    }
  },

  /**
   * Creates a new user in mongo
   * @param {String} email
   * @param {String} password
   * @param {String} name
   * @return {Promise<Object>}
   */
  async createUser(email, password, name) {
    return new Promise((resolve, reject) => {
      bcrypt
        .hash(password, 10)
        .then((hashedPassword) => {
          UserModel.create({ email, hashedPassword, name }, (err, newUser) => {
            if (err) {
              reject(err);
            } else {
              newUserSubscription.add(newUser);
              resolve(newUser);
            }
          });
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
};

module.exports = UserServices;
