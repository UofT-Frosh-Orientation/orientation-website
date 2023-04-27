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
    payments: [paymentSchema],
    utorid: {
      type: String,
      required: true,
    },
    shirtSize: {
      type: String,
      enum: ['S', 'M', 'L', 'XL'],
      required: true,
    },
    phoneNumberAreaCode: {
      type: String,
      required: false,
      default: '1',
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    phoneNumberAreaCode: {
      type: String,
      required: false,
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
    emergencyContactNumber: {
      type: String,
      required: true,
    },
    emergencyContactNumberAreaCode: {
      type: String,
      required: false,
      default: '1',
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
    allergiesMore: {
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
    accommodationOther: {
      type: String,
      required: false,
    },
    scunt: {
      type: Boolean, // true is attending scunt, false is not attending
      required: false,
    },
    summerLocation: {
      type: Boolean, // true is in GTA, false is out of GTA
      required: false,
    },
    summerLocationOther: {
      type: String,
      required: false,
    },
    moveToToronto: {
      type: String,
      enum: ['N/A', 'May', 'June', 'July', 'August', 'September'],
      required: false,
    },
    commuterProgram: {
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
    commuterProgramStop: {
      type: String,
      required: false,
    },
    legalName: {
      type: String,
      required: true,
    },
    bursaryRequested: {
      type: Boolean,
      required: true,
      default: false,
    },
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
