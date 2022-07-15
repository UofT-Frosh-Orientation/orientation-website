const bcrypt = require('bcrypt');
const EmailValidator = require('email-validator');
const jwt = require('jsonwebtoken');

const UserModel = require('../models/UserModel');
const newUserSubscription = require('../subscribers/newUserSubscription');

const passwordValidator =
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#+.<>?!@$%^&*-/\\~_=]).{8,}$/;

const UserServices = {
  /**
   * Validates the fields for a user.
   * @param {String} email
   * @param {String} password
   * @return {Promise<void>}
   */
  async validateUser(email, password) {
    const user = await UserModel.findOne({ email: email.toLowerCase() });
    if (user) {
      throw new Error('DUPLICATE_EMAIL');
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
          UserModel.create(
            { email, hashedPassword, firstName, lastName, preferredName },
            (err, newUser) => {
              if (err) {
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

  async generatePasswordResetToken(email) {
    return new Promise((resolve, reject) => {
      UserModel.findOne({ email }, (err, user) => {
        if (err) {
          reject(err);
        } else if (!user) {
          reject('INVALID_EMAIL');
        } else {
          const { email } = user;
          jwt.sign(
            { email, timestamp: Date.now() },
            process.env.JWT_RESET_TOKEN,
            { expiresIn: '7d' },
            (err, token) => {
              if (err) {
                reject(err);
              } else {
                resolve(token);
              }
            },
          );
        }
      });
    });
  },

  async validatePasswordResetToken(token) {
    return new Promise((resolve, reject) => {
      jwt.verify(token, process.env.JWT_RESET_TOKEN, (err, decoded) => {
        console.log(err);
        console.log(decoded);
        if (err) {
          reject(err);
        } else {
          const { email } = decoded;
          resolve(email);
        }
      });
    });
  },

  async getUserByEmail(email) {
    return new Promise((resolve, reject) => {
      UserModel.findOne({ email }, (err, user) => {
        if (err) {
          reject(err);
        } else {
          resolve(user);
        }
      });
    });
  },

  async updatePassword(email, password) {
    if (!passwordValidator.test(password)) {
      throw new Error('INVALID_PASSWORD');
    }
    return new Promise((resolve, reject) => {
      bcrypt.hash(password, 10).then((hashedPassword) => {
        UserModel.findOneAndUpdate(
          { email },
          { hashedPassword },
          { returnDocument: 'after' },
          (err, updatedUser) => {
            if (err) {
              reject(err);
            } else if (!updatedUser) {
              reject('INVALID_EMAIL');
            } else {
              resolve(updatedUser);
            }
          },
        );
      });
    });
  },
};

module.exports = UserServices;
