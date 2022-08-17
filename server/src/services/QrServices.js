const UserModel = require('../models/UserModel');

const QrServices = {
  async getSearchedUserData(search) {
    return new Promise((resolve, reject) => {
      UserModel.find(
        {
          $or: [
            { firstName: { $regex: search } },
            { lastName: { $regex: search } },
            { email: { $regex: search } },
          ],
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
