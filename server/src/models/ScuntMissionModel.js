const mongoose = require('mongoose');
const getResponseObject = require('../util/getResponseObject');

const ScuntMissionSchema = new mongoose.Schema({
  number: {
    type: Number,
    required: false,
    default: 0,
    index: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: false,
    default: '',
  },
  points: {
    type: Number,
    required: false,
    default: 0,
  },
  isHidden: {
    type: Boolean,
    required: false,
    default: false,
  },
});
ScuntMissionSchema.methods.getResponseObject = getResponseObject;
const ScuntMissionModel = mongoose.model('ScuntMission', ScuntMissionSchema);
module.exports = ScuntMissionModel;
