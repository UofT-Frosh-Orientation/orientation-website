const bcrypt = require('bcrypt');
const EmailValidator = require('email-validator');

const UserModel = require('../models/UserModel');
const newUserSubscription = require('../subscribers/newUserSubscription');

const passwordValidator = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/;

const UserServices = {
  /**
   * Validates the fields for a user.
   * @param {String} email
   * @param {String} password
   * @param {String} name
   * @return {Promise<void>}
   */
  async validateUser(email, password, firstName, lastName) {
    const user = await UserModel.findOne({ email });
    if (user) {
      throw new Error('DUPLICATE_EMAIL');
    }
    if (firstName === '' || firstName === undefined || firstName === null || lastName === '' || lastName === undefined || lastName === null ) {
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
   * @param {String} firstName
   * @param {String} lastName
   * @param {String} preferredName
   * @return {Promise<Object>}
   */
  async createUser(email, password, firstName, lastName, preferredName) {
    return new Promise((resolve, reject) => {
      bcrypt
        .hash(password, 10)
        .then((hashedPassword) => {
          UserModel.create({ email, hashedPassword, firstName, lastName, preferredName}, (err, newUser) => {
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
