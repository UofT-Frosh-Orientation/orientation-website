const bcrypt = require('bcrypt');
const EmailValidator = require('email-validator');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const UserModel = require('../models/UserModel');
const emailConfirmationSubscription = require('../subscribers/emailConfirmationSubscription');

function createScuntToken() {
  let result = '';
  const characters = '0123456789';
  const charactersLength = characters.length;
  for (let i = 0; i < 5; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

/**
 * @description Creates an email confirmation token for a user
 * @param {string} email
 * @returns {Token}
 */
function generateEmailConfirmationToken(email) {
  return jwt.sign(email, process.env.JWT_EMAIL_CONFIRMATION_TOKEN);
}

const UserServices = {
  /**
   * Validates the fields for a user.
   * @param {String} email
   * @param {String} password
   * @return {Promise<void>}
   */
  async validateUser(email, password) {
    const passwordValidator =
      /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[~`_=^:();<>+-.@$!%*#?&])[A-Za-z0-9@$_=!%:*#?&.]/;
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
  async create(email, password, firstName, lastName, preferredName) {
    const scuntToken = createScuntToken();
    const hashedPassword = await bcrypt.hash(password, 10).then(
      (hash) => hash,
      (error) => {
        throw new Error('UNABLE_TO_HASH_PASSWORD', { cause: error });
      },
    );

    return UserModel.create({
      email,
      hashedPassword,
      firstName,
      lastName,
      preferredName,
      scuntToken,
    }).then(
      (newUser) => {
        const token = generateEmailConfirmationToken(email);
        emailConfirmationSubscription.add({ token, email });
        return newUser;
      },
      (error) => {
        throw new Error('UNABLE_TO_CREATE_USER', { cause: error });
      },
    );
  },

  /**
   * @description Creates a password reset token for a user
   * @param {string} email
   * @returns {Token}
   */
  async generatePasswordResetToken(email) {
    const userEmail = await UserModel.findOne({ email }).then(
      (user) => {
        if (!user) throw new Error('USER_NOT_FOUND');
        return email;
      },
      (error) => {
        throw new Error('UNABLE_TO_GET_USER', { cause: error });
      },
    );
    return new Promise((resolve, reject) => {
      jwt.sign(
        { userEmail, timestamp: Date.now() },
        process.env.JWT_RESET_TOKEN,
        {
          expiresIn: '7d',
        },
        function (error, decoded) {
          if (error) {
            reject(new Error('UNABLE_TO_GENERATE_PASSWORD_RESET_TOKEN', { cause: error }));
          }
          resolve(decoded);
        },
      );
    });
  },

  checkScuntToken(existingUser) {
    if (!existingUser.scuntToken) {
      return false;
    }
    return true;
  },

  /**
   * @description Creates a scunt token for a user
   * @param {String} userId
   * @returns {User}
   */
  async addScuntToken(userId) {
    const scuntToken = createScuntToken();

    return UserModel.findByIdAndUpdate(
      userId,
      { scuntToken },
      { new: true, returnDocument: 'after' },
    ).then(
      (user) => {
        if (!user) throw new Error('USER_NOT_FOUND');
        return user;
      },
      (error) => {
        throw new Error('UNABLE_TO_UPDATE_SCUNT_TOKEN_FOR_USER', { cause: error });
      },
    );
  },

  /**
   * @description Validates a password reset token
   * @param {String} token
   * @returns {decodedToken}
   */
  async validatePasswordResetToken(token) {
    return new Promise((resolve, reject) => {
      jwt.verify(token, process.env.JWT_RESET_TOKEN, (err, decoded) => {
        if (err) {
          reject(new Error('UNABLE_TO_VALIDATE_PASSWORD_RESET_TOKEN', { cause: err }));
        } else {
          resolve(decoded);
        }
      });
    });
  },

  /**
   * @description Validates a email confirmation token
   * @param {String} token
   * @returns {decodedToken}
   */
  async validateEmailConfirmationToken(token) {
    return new Promise((resolve, reject) => {
      jwt.verify(token, process.env.JWT_EMAIL_CONFIRMATION_TOKEN, (error, decoded) => {
        if (error) {
          reject(new Error('UNABLE_TO_VALIDATE_EMAIL_CONFIRMATION_TOKEN', { cause: error }));
        } else {
          resolve(decoded);
        }
      });
    });
  },

  /**
   * @description Gets a user by email
   * @param {String} email
   * @returns {User}
   */
  async getUserByEmail(email) {
    return UserModel.findOne({ email }).then(
      (user) => {
        if (!user) throw new Error('USER_NOT_FOUND');
        return user;
      },
      (error) => {
        throw new Error('UNABLE_TO_GET_USER', { cause: error });
      },
    );
  },

  /**
   * @description Gets a user by id
   * @param {String} userID
   * @returns {User}
   */
  async getUserByID(userID) {
    return UserModel.findById(userID).then(
      (user) => {
        if (!user) throw new Error('USER_NOT_FOUND');
        return user;
      },
      (error) => {
        throw new Error('UNABLE_TO_GET_USER', { cause: error });
      },
    );
  },

  /**
   * @description Gets all users
   * @returns {User[]}
   */
  async getAllUsers() {
    return UserModel.find({}).then(
      (users) => {
        if (!users.length) throw new Error('USERS_NOT_FOUND');
        return users;
      },
      (error) => {
        throw new Error('UNABLE_TO_GET_USERS', { cause: error });
      },
    );
  },

  /**
   * @description Updates a user's password
   * @param {String} email
   * @param {String} password
   * @returns {User}
   */
  async updatePassword(email, password) {
    const passwordValidator =
      /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[~`_=^:();<>+-.@$!%*#?&])[A-Za-z0-9@$_=!%:*#?&.]{8,}/;
    if (!passwordValidator.test(password)) throw new Error('INVALID_PASSWORD');

    const hashedPassword = await bcrypt.hash(password, 10);

    return UserModel.findOneAndUpdate(
      { email },
      { hashedPassword },
      { returnDocument: 'after' },
    ).then(
      (user) => {
        if (!user) throw new Error('USER_NOT_FOUND');
        return user;
      },
      (error) => {
        throw new Error('UNABLE_TO_UPDATE_PASSWORD_FOR_USER', { cause: error });
      },
    );
  },

  /**
   * @description Updates a user's Auth Scopes
   * @param {String} userID
   * @param {String[]} scopes
   * @returns {User}
   */
  async requestAuthScopes(userID, scopes) {
    return UserModel.findByIdAndUpdate(
      userID,
      { 'authScopes.requested': scopes },
      { returnDocument: 'after' },
    ).then(
      (updatedUser) => {
        if (!updatedUser) throw new Error('USER_NOT_FOUND');
        return updatedUser;
      },
      (error) => {
        throw new Error('UNABLE_TO_UPDATE_AUTH_SCOPES_FOR_USER', { cause: error });
      },
    );
  },

  /**
   * @description Unsubscribes a user from emails
   * @param {String} email
   * @returns {User}
   */
  async unsubscribeUser(email) {
    return UserModel.findOneAndUpdate(
      { email },
      { canEmail: false },
      { returnDocument: 'after' },
    ).then(
      (updatedUser) => {
        if (!updatedUser) throw new Error('USER_NOT_FOUND');
        return updatedUser;
      },
      (error) => {
        throw new Error('UNABLE_TO_UNSUBSCRIBE_USER', { cause: error });
      },
    );
  },

  /**
   * @description Resubscribes a user from emails
   * @param {String} email
   * @returns {User}
   */
  async resubscribeUser(email) {
    return UserModel.findOneAndUpdate(
      { email },
      { canEmail: true },
      { returnDocument: 'after' },
    ).then(
      (updatedUser) => {
        if (!updatedUser) throw new Error('USER_NOT_FOUND');
        return updatedUser;
      },
      (error) => {
        throw new Error('UNABLE_TO_UPDATE_AUTH_SCOPES_FOR_USER', { cause: error });
      },
    );
  },

  /**
   * @description Gets all users who have not been approved
   * @returns {User[]}
   */
  async getUnapprovedUsers() {
    return UserModel.find(
      { approved: { $exists: true, $eq: false } },
      {},
      { strictQuery: false },
    ).then(
      (users) => {
        if (!users.length) throw new Error('USERS_NOT_FOUND');
        return users;
      },
      (error) => {
        throw new Error('UNABLE_TO_FIND_USERS', { cause: error });
      },
    );
  },

  /**
   * @description Get a users auth scopes
   * @returns {String[]}
   */
  async getUsersAuthScopes() {
    return UserModel.find(
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
    ).then(
      (users) => {
        if (!users.length) throw new Error('USERS_NOT_FOUND');
        return users;
      },
      (error) => {
        throw new Error('UNABLE_TO_FIND_USERS', { cause: error });
      },
    );
  },

  /**
   * @description approve users by ids
   * @param {String[]} accountIds
   * @returns {User[]}
   */
  async approveAccountsByIds(accountIds) {
    return UserModel.collection
      .updateMany(
        { _id: { $in: accountIds.map((id) => new mongoose.Types.ObjectId(id)) } },
        { $set: { approved: true } },
        { strictQuery: false },
      )
      .then(
        (results) => {
          if (results.matchedCount !== accountIds.length) throw new Error('USERS_NOT_FOUND');
          return results;
        },
        (error) => {
          throw new Error('UNABLE_TO_APPROVE_USERS', { cause: error });
        },
      );
  },

  /**
   * @description update users auth scopes
   * @param {String[]} userAuthScopes
   * @returns {String[]}
   */
  async updateAuthScopes(userAuthScopes) {
    return UserModel.collection
      .bulkWrite(
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
              filter: { _id: { $eq: new mongoose.Types.ObjectId(user.id) } },
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
      )
      .then(
        (results) => {
          if (results.modifiedCount !== userAuthScopes.length) throw new Error('USERS_NOT_FOUND');
          return results;
        },
        (error) => {
          throw new Error('UNABLE_TO_UPDATE_USERS', { cause: error });
        },
      );
  },

  /**
   * @description Get all scunt judges
   * @returns {User[]}
   */
  async getScuntJudgeUsers() {
    return UserModel.find(
      {
        $or: [
          { 'authScopes.approved': 'scunt:judge bribe points' },
          { 'authScopes.approved': 'scunt:judge missions' },
          // { 'authScopes.approved': 'scunt:bribe points' }, // this was the wrong scope name i think....
          // { 'authScopes.approved': 'scunt:judge missions' },
        ],
      },
      {},
      { strictQuery: false },
    ).then(
      (users) => {
        if (!users.length) throw new Error('USERS_NOT_FOUND');
        return users;
      },
      (error) => {
        throw new Error('UNABLE_TO_FIND_USERS', { cause: error });
      },
    );
  },

  /**
   * @description Updates a user's info
   * @param {String} userId
   * @param {Object} updateInfo
   * @returns {User}
   */
  async updateUserInfo(userId, updateInfo) {
    return UserModel.findByIdAndUpdate(userId, updateInfo, {
      returnDocument: 'after',
    }).then(
      (user) => {
        if (!user) throw new Error('USER_NOT_FOUND');
        return user;
      },
      (error) => {
        throw new Error('UNABLE_TO_UPDATE_USER', { cause: error });
      },
    );
  },

  /**
   * @description Hard deletes a user by id.
   * @param {ObjectId} id - id of the user to be deleted
   * @return {User} - the user which was deleted
   */
  async deleteUser(id) {
    return UserModel.findByIdAndDelete(id).then(
      (deletedUser) => {
        if (!deletedUser) throw new Error('USER_NOT_FOUND');
        return deletedUser;
      },
      (error) => {
        throw new Error('UNABLE_TO_DELETE_USER', { cause: error });
      },
    );
  },
};

module.exports = UserServices;
