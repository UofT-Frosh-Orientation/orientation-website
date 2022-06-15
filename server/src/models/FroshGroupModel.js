const mongoose = require('mongoose');

const FroshGroupSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  totalNum: {
    type: Number,
    default: 0,
  },
  'they/them': {
    type: Number,
    default: 0,
  },
  'he/him': {
    type: Number,
    default: 0,
  },
  'she/her': {
    type: Number,
    default: 0,
  },
  other: {
    type: Number,
    default: 0,
  },
  'Chemical Engineering': {
    type: Number,
    default: 0,
  },
  'Civil Engineering': {
    type: Number,
    default: 0,
  },
  'Computer Engineering': {
    type: Number,
    default: 0,
  },
  'Electrical Engineering': {
    type: Number,
    default: 0,
  },
  'Engineering Science': {
    type: Number,
    default: 0,
  },
  'Industrial Engineering': {
    type: Number,
    default: 0,
  },
  'Materials Engineering': {
    type: Number,
    default: 0,
  },
  'Mechanical Engineering': {
    type: Number,
    default: 0,
  },
  'Mineral Engineering': {
    type: Number,
    default: 0,
  },
  'Track One (Undeclared)': {
    type: Number,
    default: 0,
  },
});

const FroshGroup = mongoose.model('FroshGroup', FroshGroupSchema);

module.exports = FroshGroup;
