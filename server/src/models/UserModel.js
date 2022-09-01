const mongoose = require('mongoose');
const getResponseObject = require('../util/getResponseObject');

const validateName = function (name) {
  return !(name === '' || name === null || name === undefined);
};

const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      validate: {
        validator: validateName,
        message: 'MISSING_NAME',
      },
      required: [true, 'MISSING_NAME'],
    },
    lastName: {
      type: String,
      validate: {
        validator: validateName,
        message: 'MISSING_NAME',
      },
      required: [true, 'MISSING_NAME'],
    },
    preferredName: {
      type: String,
      required: false,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    hashedPassword: {
      type: String,
      required: true,
    },
    authScopes: {
      type: {
        requested: {
          type: [String],
          required: true,
          default: [],
        },
        approved: {
          type: [String],
          required: true,
          default: [],
        },
      },
      required: true,
      default: { requested: [], approved: [] },
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
    completedAnnouncements: {
      type: [
        {
          announcementID: {
            type: String,
          },
          announcementName: {
            type: String,
          },
        },
      ],
      default: [],
    },
    scuntToken: {
      type: String,
      required: false,
    },
    isScuntDiscordLoggedIn: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  { discriminatorKey: 'userType' },
);

/**
 * Removes all fields from the user document which should not be sent in a response from the server.
 * @return {Object}
 */
UserSchema.methods.getResponseObject = getResponseObject;

const UserModel = mongoose.model('User', UserSchema);

module.exports = UserModel;
