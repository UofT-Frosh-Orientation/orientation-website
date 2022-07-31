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
    froshDataFieldsRequested: {
      type: [String],
      required: true,
      default: [],
    },
    froshDataFieldsApproved: {
      type: [String],
      required: true,
      default: [],
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
