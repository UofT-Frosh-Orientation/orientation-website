const FroshModel = require('../models/FroshModel');

const QrServices = {
  async getSearchedUserData(search) {
    return new Promise((resolve, reject) => {
      FroshModel.find(
        {
          $or: [{ email: { $regex: search } }],
          isRegistered: true,
        },
        'email firstName lastName pronouns shirtSize froshGroup discipline',
        (error, data) => {
          if (error) {
            reject(error);
          } else {
            resolve(data);
          }
        },
      );
    });
  },
};

module.exports = QrServices;
