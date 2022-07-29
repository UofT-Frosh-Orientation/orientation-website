const bcrypt = require('bcrypt');

const LeadurModel = require('../models/LeadurModel');
const newUserSubscription = require('../subscribers/newUserSubscription');

const LeadurServices = {
  async createLeadur(email, password, firstName, lastName, preferredName) {
    return new Promise((resolve, reject) => {
      bcrypt
        .hash(password, 10)
        .then((hashedPassword) => {
          LeadurModel.create(
            { email, hashedPassword, firstName, lastName, preferredName },
            (err, newUser) => {
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
};

module.exports = LeadurServices;
