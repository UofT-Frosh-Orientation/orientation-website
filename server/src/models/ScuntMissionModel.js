const mongoose = require('mongoose');
const getResponseObject = require('../util/getResponseObject');

const ScuntMissionSchema = new mongoose.Schema({
  number: {
    type: Number,
    required: false,
    default: 0,
    index: true,
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

const ScuntMissionModel = mongoose.model('ScuntMission', ScuntMissionSchema);
ScuntMissionSchema.methods.getReponseObject = getResponseObject;
module.exports = ScuntMissionModel;
