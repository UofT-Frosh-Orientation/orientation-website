const bcrypt = require('bcrypt');
const EmailValidator = require('email-validator');
const jwt = require('jsonwebtoken');

const UserModel = require('../models/UserModel');
const newUserSubscription = require('../subscribers/newUserSubscription');

const passwordValidator =
  /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@$!%*#?&])[A-Za-z0-9@$!%*#?&]{8,}/;

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

  async getAllUsers() {
    return new Promise((resolve, reject) => {
      UserModel.find({}, (err, users) => {
        if (err) {
          reject(err);
        } else {
          resolve(users);
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

  async requestAuthScopes(user, scopes) {
    return new Promise((resolve, reject) => {
      UserModel.findByIdAndUpdate(
        user.id,
        { 'authScopes.requested': scopes },
        { returnDocument: 'after' },
        (err, updatedUser) => {
          if (err) {
            reject(err);
          } else if (!updatedUser) {
            reject('INVALID_USER');
          } else {
            resolve(updatedUser);
          }
        },
      );
    });
  },

  async getUnapprovedUsers() {
    return new Promise((resolve, reject) => {
      UserModel.find({ approved: { $eq: false } }, (err, users) => {
        if (err) {
          reject(err);
        } else if (!users) {
          reject('INTERNAL_ERROR');
        } else {
          resolve(users);
        }
      });
    });
  },

  async getUsersUnapprovedAuthScopes() {
    return new Promise((resolve, reject) => {
      UserModel.find(
        {
          $or: [
            { 'authScopes.requested': { $exists: true, $ne: [] } },
            { 'froshDataFields.requested': { $exists: true, $ne: [] } },
          ],
        },
        (err, users) => {
          if (err) {
            reject(err);
          } else if (!users) {
            reject('INTERNAL_ERROR');
          } else {
            resolve(users);
          }
        },
      );
    });
  },

  async approveAccountsByIds(accountIds) {
    return new Promise((resolve, reject) => {
      UserModel.updateMany({ _id: { $in: accountIds } }, { approved: true }, {}, (err, result) => {
        if (err) {
          reject(err);
        } else if (!result) {
          reject('INTERNAL_ERROR');
        } else {
          resolve(result);
        }
      });
    });
  },

  async updateAuthScopes(userAuthScopes) {
    return new Promise((resolve, reject) => {
      UserModel.collection.bulkWrite(
        userAuthScopes.map((user) => {
          return {
            updateOne: {
              filter: { id: user.id },
              update: {
                $push: {
                  'authScopes.approved': {
                    $each: user.auth.reduce((prev, curr) => {
                      if (curr.approve) {
                        prev.push(curr.authreq);
                      }
                      return prev;
                    }, []),
                  },
                },
                $pull: {
                  'authScopes.requested': {
                    $in: user.auth.reduce((prev, curr) => {
                      if (curr.approve || curr.deny) {
                        prev.push(curr.authreq);
                      }
                      return prev;
                    }, []),
                  },
                },
              },
              upsert: false,
            },
          };
        }),
        (err, result) => {
          if (err) {
            reject(err);
          } else {
            resolve(result);
          }
        },
      );
    });
  },
};

module.exports = UserServices;
