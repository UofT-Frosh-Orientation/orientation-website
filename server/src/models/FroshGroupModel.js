const mongoose = require('mongoose');

const FroshGroupSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  icon: {
    type: String,
    required: true,
  },
  totalNum: {
    type: Number,
    default: 0,
  },
  'Prefer Not to Say': {
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
  Chemical: {
    type: Number,
    default: 0,
  },
  Civil: {
    type: Number,
    default: 0,
  },
  'Electrical & Computer': {
    type: Number,
    default: 0,
  },
  'Engineering Science': {
    type: Number,
    default: 0,
  },
  Industrial: {
    type: Number,
    default: 0,
  },
  Materials: {
    type: Number,
    default: 0,
  },
  Mechanical: {
    type: Number,
    default: 0,
  },
  Mineral: {
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
