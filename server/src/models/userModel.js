const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
  {
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
      type: [
        {
          scope: {
            type: String,
            required: true,
          },
          approved: {
            type: [String],
            required: true,
            default: [],
          },
          requested: {
            type: [String],
            required: true,
            default: [],
          },
        },
      ],
      required: true,
      default: [],
    },
    isDeleted: {
      type: Boolean,
      required: true,
      default: false,
    },
    accountCreatedAt: {
      type: Date,
      required: true,
      default: new Date(),
    },
    lastUpdatedAt: {
      type: Date,
      required: true,
      default: new Date(),
    },
    lastUpdatedFields: {
      type: [String],
      required: false,
      default: [],
    },
    canEmail: {
      type: Boolean,
      required: true,
      default: true,
    },
  },
  { discriminatorKey: 'userType' },
);

/**
 * Removes all fields from the user document which should not be sent in a response from the server.
 * @return {Object}
 */
UserSchema.methods.getResponseObject = function () {
  const {
    _id,
    __v,
    hashedPassword,
    authScopes,
    canEmail,
    isDeleted,
    accountCreatedAt,
    lastUpdatedAt,
    lastUpdatedFields,
    ...user
  } = this.toObject();
  return { ...user, id: _id };
};

const UserModel = mongoose.model('User', UserSchema);

module.exports = UserModel;
