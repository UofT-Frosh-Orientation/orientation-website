const mongoose = require('mongoose');

const FroshSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  preferredName: {
    type: String,
    required: false,
    default: '',
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
    enum: ['EngSci', 'ECE', 'Civ'], //TODO: extend frosh model to support all disciplines
    required: true,
  },
  medicalInfo: {
    type: String,
    required: false,
    default: '',
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  emergencyContact: {
    name: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
  },
  shirtSize: {
    type: String,
    enum: ['Small', 'Medium', 'Large'],
  },
  isMeetup: {
    type: Boolean,
    required: true,
  },
  isScunt: {
    type: Boolean,
    required: true,
  },
  isAgreeTerms: {
    type: Boolean,
    required: true,
  },
  isMediaConsent: {
    type: Boolean,
    required: true,
  },
  froshGroup: {
    type: String,
    enum: ['alpha'], //TODO: Update frosh groups list in frosh model
    required: true,
  },
  balance: {
    type: Number,
    required: true,
  },
  lastUpdatedAt: {
    type: Date,
    required: true,
  },
  lastUpdatedFields: {
    type: Array,
    required: false,
    default: [],
  },
  accountCreatedAt: {
    type: Date,
    required: true,
  },
  resetPasswordToken: {
    type: String,
    required: false,
    default: Date.now(),
  },
  isDeleted: {
    type: Boolean,
    required: false,
    default: false,
  },
});

const requiredFields = Object.keys(FroshSchema.obj).filter(field => FroshSchema[field].isRequired);

const FroshModel = mongoose.model('Frosh', FroshSchema);

module.exports = {
  FroshModel,
  requiredFields
};
