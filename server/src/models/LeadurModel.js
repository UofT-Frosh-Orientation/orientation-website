const mongoose = require('mongoose');
const UserModel = require('./UserModel');
const getResponseObject = require('../util/getResponseObject');

const LeadurSchema = new mongoose.Schema(
  {
    approved: {
      type: Boolean,
      required: true,
      default: false,
    },
    froshDataFields: {
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
    froshGroupName: {
      type: String,
      required: false,
      default: '',
    },
    froshGroupIcon: {
      type: String,
      required: false,
      default: '',
    },
    subCom: {
      type: String,
      required: false,
      default: '',
    },
  },
  { discriminatorKey: 'userType' },
);
LeadurSchema.methods.getResponseObject = getResponseObject;
const LeadurModel = UserModel.discriminator('leadur', LeadurSchema);
module.exports = LeadurModel;
