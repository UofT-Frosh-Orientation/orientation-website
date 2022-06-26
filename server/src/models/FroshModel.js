const mongoose = require('mongoose');

const UserModel = require('./UserModel');
const getResponseObject = require('../util/getResponseObject');

const paymentSchema = new mongoose.Schema({
  item: {
    type: String,
    required: true,
  },
  paymentIntent: {
    type: String,
    required: true,
  },
  amountDue: {
    type: Number,
    required: true,
  },
  bursaryRequested: {
    type: Boolean,
    required: true,
    default: false,
  },
  bursaryApproved: {
    type: Boolean,
    required: true,
    default: false,
  },
});

const FroshSchema = new mongoose.Schema(
  {
    preferredName: {
      type: String,
      required: false,
    },
    birthDate: {
      type: Date,
      required: true,
    },
    pronouns: {
      type: String,
      required: true,
    },
    discipline: {
      type: String,
      enum: [
        'Chemical Engineering',
        'Civil Engineering',
        'Computer Engineering',
        'Electrical Engineering',
        'Engineering Science',
        'Industrial Engineering',
        'Materials Engineering',
        'Mechanical Engineering',
        'Mineral Engineering',
        'Track One (Undeclared)',
      ],
      required: true,
    },
    froshGroup: {
      type: String, //TODO: add enum validation to frosh groups with all valid Frosh Group names
      required: true,
    },
    payments: [paymentSchema],
  },
  { discriminatorKey: 'userType', strict: true },
);

FroshSchema.methods.getResponseObject = getResponseObject;

const FroshModel = UserModel.discriminator('frosh', FroshSchema);

module.exports = FroshModel;
