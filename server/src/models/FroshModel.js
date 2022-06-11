const mongoose = require('mongoose');

const UserModel = require('./userModel');

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
  },
  { discriminatorKey: 'userType', strict: true },
);

const FroshModel = UserModel.discriminator('frosh', FroshSchema);

module.exports = FroshModel;
