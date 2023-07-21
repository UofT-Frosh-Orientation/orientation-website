const bcrypt = require('bcrypt');
const LeadurModel = require('../models/LeadurModel');
const emailConfirmationSubscription = require('../subscribers/emailConfirmationSubscription');

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
    const hashedPassword = bcrypt.hash(password, 10).then(
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
        emailConfirmationSubscription.add(newLeedur);
        return newLeedur;
      },
      (error) => {
        throw new Error('UNABLE_TO_CREATE_LEEDUR', { cause: error });
      },
    );
  },

  /**
   * @description Update leedur permissions
   * @param {Leedur} user leeduur to update
   * @param {String[]} requestedFields fields requested by user
   * @param {String[]} requestedAuthScopes auth scopes requested by user
   * @returns {Leedur} updated leedur
   */
  async requestScopesAndData(user, requestedFields, requestedAuthScopes) {
    return LeadurModel.findByIdAndUpdate(
      user.id,
      {
        'froshDataFields.requested': requestedFields,
        'authScopes.requested': requestedAuthScopes,
      },
      { returnDocument: 'after' },
    ).then(
      (updatedLeedur) => {
        if (!updatedLeedur) throw new Error('INVALID_USER');
        return updatedLeedur;
      },
      (error) => {
        throw new Error('UNABLE_TO_UPDATE_LEEDUR', { cause: error });
      },
    );
  },
};

module.exports = LeadurServices;
