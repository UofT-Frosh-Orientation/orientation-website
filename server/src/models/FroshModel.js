const mongoose = require('mongoose');
const UserModel = require('./UserModel');
const getResponseObject = require('../util/getResponseObject');
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
      enum: ['Prefer Not to Say', 'he/him', 'she/her', 'they/them', 'Other'],
      required: true,
    },
    pronounsOther: {
      type: String,
      required: false,
    },
    discipline: {
      type: String,
      enum: [
        'Chemical',
        'Civil',
        'Electrical & Computer',
        'Engineering Science',
        'Industrial',
        'Materials',
        'Mechanical',
        'Mineral',
        'Track One (Undeclared)',
      ],
      required: true,
    },
    froshGroup: {
      type: String, //TODO: add enum validation to frosh groups with all valid Frosh Group names
      required: true,
    },
    utorid: {
      type: String,
      required: true,
    },
    shirtSize: {
      type: String,
      enum: ['S', 'M', 'L', 'XL'],
      required: true,
    },
    phoneNumber: {
      type: Number,
      required: true,
    },
    instagram: {
      type: String, //needs an @ symbol at the beginning
      required: false,
    },
    emergencyContactName: {
      type: String,
      required: true,
    },
    emergencyContactRelationship: {
      type: String,
      required: true,
    },
    phoneNumberEmergency: {
      type: Number,
      required: true,
    },
    medicalInfo: {
      type: String,
      required: false,
    },
    medication: {
      type: String,
      required: false,
    },
    allergies: {
      type: [String],
      required: false,
    },
    allergiesOther: {
      type: String,
      required: false,
    },
    photograph: {
      type: Boolean, // true is okay with being photographed, false it not
      required: false,
    },
    accessibility: {
      type: String,
      required: false,
    },
    accommodation: {
      type: Boolean, // true is want to be contacted, false is not
      required: false,
    },
    accommodationContact: {
      type: String,
      enum: ['Phone', 'Email', 'Other'], // other option
      required: false,
    },
    accessibilityOther: {
      type: String,
      required: false,
    },
    scunt: {
      type: Boolean, // true is attending scunt, false is not attending
      required: false,
    },
    summerLocationGTA: {
      type: Boolean, // true is in GTA, false is out of GTA
      required: false,
    },
    summerLocationOther: {
      type: Boolean,
      required: false,
    },
    moveToToronto: {
      type: String,
      enum: ['N/A', 'May', 'June', 'July', 'August', 'September'],
      required: false,
    },
    commuterPorgram: {
      type: Boolean,
      required: false,
    },
    commuterProgramInformation: {
      type: String,
      enum: ['Car', 'Bus', 'Subway', 'Go Train', 'Walking', 'Biking', 'Other'], // also has an other option
      required: false,
    },
    commuterProgramOther: {
      type: String,
      required: false,
    },
    commuterPorgramStop: {
      type: String,
      required: false,
    },
  },
  { discriminatorKey: 'userType', strict: true },
);
FroshSchema.methods.getResponseObject = getResponseObject;
const FroshModel = UserModel.discriminator('frosh', FroshSchema);
module.exports = FroshModel;
