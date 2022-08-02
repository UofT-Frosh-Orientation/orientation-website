const UserModel = require('../models/UserModel');

const getScuntToken = (userId) => {
  return new Promise((resolve, reject) => {
    const token = createRandomScuntToken();
    UserModel.findOneAndUpdate({ _id: userId }, { scuntToken: token }, (err, user) => {
      if (err || !user) {
        reject('UNABLE_TO_UPDATE_SCUNT_TOKEN_FOR_USER');
      } else {
        resolve(user);
      }
    });
  });
};

const createRandomScuntToken = () => {
  var result = '';
  var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for (var i = 0; i < 7; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

module.exports = { getScuntToken, createRandomScuntToken };
