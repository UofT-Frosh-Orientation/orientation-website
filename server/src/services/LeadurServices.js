const bcrypt = require('bcrypt');
const LeadurModel = require('../models/LeadurModel');
const emailConfirmationSubscription = require('../subscribers/emailConfirmationSubscription');
const jwt = require('jsonwebtoken');

/**
 * @description Creates an email confirmation token for a user
 * @param {string} email
 * @returns {Token}
 */
function generateEmailConfirmationToken(email) {
  return jwt.sign(email, process.env.JWT_EMAIL_CONFIRMATION_TOKEN);
}

const LeadurServices = {
  /**
   * @description Creates a new user with type Leadur.
   * @param {String} email
   * @param {String} password
   * @param {String} firstName
   * @param {String} lastName
   * @param {String} preferredName
   * @param {Number} scuntTeam
   * @return {Leedur}
   */
  async createLeadur(email, password, firstName, lastName, preferredName, scuntTeam) {
    const hashedPassword = await bcrypt.hash(password, 10).then(
      (hashedPassword) => hashedPassword,
      (error) => {
        throw new Error('UNABLE_TO_HASH_PASSWORD', { cause: error });
      },
    );

    return LeadurModel.create({
      email,
      hashedPassword,
      firstName,
      lastName,
      preferredName,
      scuntTeam,
    }).then(
      (newLeedur) => {
        const token = generateEmailConfirmationToken(email);
        emailConfirmationSubscription.add({ token, email });
        return newLeedur;
      },
      (error) => {
        throw new Error('UNABLE_TO_CREATE_LEEDUR', { cause: error });
      },
    );
  },

  /**
   * @description Update leedur permissions
   * @param {String} userID leeduur to update
   * @param {String[]} requestedFields fields requested by user
   * @param {String[]} requestedAuthScopes auth scopes requested by user
   * @returns {Leedur} updated leedur
   */
  async requestScopesAndData(userID, requestedFields, requestedAuthScopes) {
    return LeadurModel.findByIdAndUpdate(
      userID,
      {
        'froshDataFields.requested': requestedFields,
        'authScopes.requested': requestedAuthScopes,
      },
      { returnDocument: 'after' },
    ).then(
      (updatedLeedur) => {
        if (!updatedLeedur) throw new Error('USER_NOT_FOUND');
        return updatedLeedur;
      },
      (error) => {
        throw new Error('UNABLE_TO_UPDATE_LEEDUR', { cause: error });
      },
    );
  },
};

module.exports = LeadurServices;
