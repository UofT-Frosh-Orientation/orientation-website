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
  expired: {
    type: Boolean,
    required: true,
    default: false,
  },
});

const FroshSchema = new mongoose.Schema(
  {
    legalName: {
      type: String,
      required: true,
    },
    pronouns: {
      type: String,
      enum: ['he/him', 'they/them', 'she/her', 'other', 'prefer not to say'],
      required: true,
    },
    pronounOther: {
      type: String,
      required: false,
    },
    birthDate: {
      type: Date,
      required: true,
    },
    utorid: {
      type: String,
      required: true,
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
    shirtSize: {
      type: String,
      enum: ['S', 'M', 'L', 'XL', '2XL', '3XL'],
      required: true,
    },
    phoneNumberCountryCode: {
      type: String,
      required: false,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    emergencyContactName: {
      type: String,
      required: true,
    },
    emergencyContactRelationship: {
      type: String,
      required: true,
    },
    emergencyContactNumber: {
      type: String,
      required: true,
    },
    bursaryRequested: {
      type: Boolean,
      required: true,
      default: false,
    },
    medicalInfo: {
      type: String,
      required: false,
    },
    specficMedicalInfo: {
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
    accessibility: {
      type: String,
      required: false,
    },
    accommodation: {
      type: Boolean, // true is want to be contacted, false is not
      required: false,
    },
    attendingScunt: {
      type: Boolean, // true is attending scunt, false is not attending
      required: true,
    },
    summerLocationCity: {
      type: String,
      required: true,
    },
    summerLocationCountry: {
      type: String,
      required: true,
    },
    moveToToronto: {
      type: String,
      enum: ['Already in Toronto', 'July', 'August', 'September'],
      required: false,
    },
    photograph: {
      type: Boolean, // true is okay with being photographed, false it not
      required: true,
    },
    froshGroup: {
      type: String, //TODO: add enum validation to frosh groups with all valid Frosh Group names
      required: true,
    },
    payments: [paymentSchema],
    isRegistered: {
      type: Boolean,
      required: true,
      default: false,
    },
    froshGroupIcon: {
      type: String,
      required: true,
      default: '',
    },
    scuntTeam: {
      type: Number,
      required: false,
      default: 0,
    },
    scuntPreferredMembers: {
      type: [String],
      required: false,
      default: [],
    },
    isRetreat: {
      // used for F!rosh that paid for retreat
      type: Boolean,
      required: false,
    },
    signInDate: {
      type: Date,
      required: false,
    },
  },
  { discriminatorKey: 'userType' },
);
FroshSchema.methods.getResponseObject = getResponseObject;
const FroshModel = UserModel.discriminator('frosh', FroshSchema);
module.exports = FroshModel;
