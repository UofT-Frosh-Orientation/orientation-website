const bcrypt = require('bcrypt');
const EmailValidator = require('email-validator');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const UserModel = require('../models/UserModel');
const newUserSubscription = require('../subscribers/newUserSubscription');

const UserServices = {
  /**
   * Validates the fields for a user.
   * @param {String} email
   * @param {String} password
   * @return {Promise<void>}
   */
  async validateUser(email, password) {
    const passwordValidator =
      /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@$!%*#?&])[A-Za-z0-9@$!%*#?&]{8,}/;
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
    console.log('Making users');
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

  checkScuntToken(existingUser) {
    return existingUser.scuntToken;
  },

  async addScuntToken(userId) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < 5; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return new Promise((resolve, reject) => {
      UserModel.findByIdAndUpdate(userId, { scuntToken: result }, (err, user) => {
        if (err || !user) {
          reject('UNABLE_TO_UPDATE_SCUNT_TOKEN_FOR_USER');
        } else {
          resolve(user);
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
    const passwordValidator =
      /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@$!%*#?&])[A-Za-z0-9@$!%*#?&]{8,}/;
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

  async unsubscribeUser(email) {
    return new Promise((resolve, reject) => {
      UserModel.findOneAndUpdate(
        { email },
        { canEmail: false },
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
  },

  async resubscribeUser(email) {
    return new Promise((resolve, reject) => {
      UserModel.findOneAndUpdate(
        { email },
        { canEmail: true },
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
  },

  async getUnapprovedUsers() {
    return new Promise((resolve, reject) => {
      UserModel.find(
        { approved: { $exists: true, $eq: false } },
        {},
        { strictQuery: false },
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

  async getUsersAuthScopes() {
    return new Promise((resolve, reject) => {
      UserModel.find(
        {
          $or: [
            { 'authScopes.requested': { $exists: true, $ne: [] } },
            { 'froshDataFields.requested': { $exists: true, $ne: [] } },
            { 'authScopes.approved': { $exists: true, $ne: [] } },
            { 'froshDataFields.approved': { $exists: true, $ne: [] } },
          ],
        },
        {},
        { strictQuery: false },
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
    console.log('accountIds', accountIds);
    return new Promise((resolve, reject) => {
      UserModel.collection.updateMany(
        { _id: { $in: accountIds.map((id) => mongoose.Types.ObjectId(id)) } },
        { $set: { approved: true } },
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

  async updateAuthScopes(userAuthScopes) {
    return new Promise((resolve, reject) => {
      UserModel.collection.bulkWrite(
        userAuthScopes.map((user) => {
          const {
            authScopesApproved,
            authScopesDenied,
            froshDataFieldsApproved,
            froshDataFieldsDenied,
          } = user.auth.reduce(
            (prev, curr) => {
              if (curr.approve) {
                if (curr.isFroshData) {
                  prev.froshDataFieldsApproved.push(curr.authreq);
                } else {
                  prev.authScopesApproved.push(curr.authreq);
                }
              } else {
                if (curr.isFroshData) {
                  prev.froshDataFieldsDenied.push(curr.authreq);
                } else {
                  prev.authScopesDenied.push(curr.authreq);
                }
              }
              return prev;
            },
            {
              authScopesApproved: [],
              authScopesDenied: [],
              froshDataFieldsApproved: [],
              froshDataFieldsDenied: [],
            },
          );
          return {
            updateOne: {
              filter: { _id: { $eq: mongoose.Types.ObjectId(user.id) } },
              update: {
                $set: {
                  'authScopes.approved': [...new Set(authScopesApproved)],
                  'froshDataFields.approved': [...new Set(froshDataFieldsApproved)],
                  'authScopes.requested': [...new Set(authScopesDenied)],
                  'froshDataFields.requested': [...new Set(froshDataFieldsDenied)],
                },
              },
            },
          };
        }),
        (err, result) => {
          if (err) {
            console.log(err);
            reject(err);
          } else {
            console.log(result);
            resolve(result);
          }
        },
      );
    });
  },

  async updateUserInfo(userId, updateInfo) {
    return new Promise((resolve, reject) => {
      UserModel.findOneAndUpdate(
        { _id: userId },
        updateInfo,
        { returnDocument: 'after' },
        (err, User) => {
          if (err || !User) {
            reject('UNABLE_TO_UPDATE_USER');
          } else {
            console.log(User);
            resolve(User);
          }
        },
      );
    });
  },

  /**
   * Hard deletes a user by id.
   * @param {ObjectId} id - id of the user to be deleted
   * @async
   * @return {Promise<Object>} - the user which was deleted
   */
  async deleteUser(id) {
    return new Promise((resolve, reject) => {
      UserModel.findOneAndDelete({ _id: id }, (err, deletedUser) => {
        if (err || !deletedUser) {
          reject('UNABLE_TO_DELETE_USER');
        } else {
          resolve(deletedUser);
        }
      });
    });
  },
};

module.exports = UserServices;
