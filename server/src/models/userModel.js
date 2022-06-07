const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  hashedPassword: {
    type: String,
    required: true,
  },
  authScopes: {
    type: [String],
    required: true,
    default: [],
  },
}, { discriminatorKey: 'userType' });

const UserModel = mongoose.model('User', UserSchema);

module.exports = UserModel;
