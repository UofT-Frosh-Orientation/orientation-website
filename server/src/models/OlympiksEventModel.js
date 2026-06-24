const mongoose = require('mongoose');

const OlympiksEventSchema = new mongoose.Schema(
  {
    activityName: {
      type: String,
      required: true,
    },
    startTime: {
      type: Date,
      required: true,
    },
    endTime: {
      type: Date,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    activityDescription: {
      type: String,
      required: true,
    },
    maxMSE: {
      type: Number,
      required: true,
    },
    currentMSE: {
      type: Number,
      required: true,
    },
    maxMech: {
      type: Number,
      required: true,
    },
    currentMech: {
      type: Number,
      required: true,
    },
    maxCivMin: {
      type: Number,
      required: true,
    },
    currentCivMin: {
      type: Number,
      required: true,
    },
    currentIndy: {
      type: Number,
      required: true,
    },
    maxIndy: {
      type: Number,
      required: true,
    },
    maxTrackOne: {
      type: Number,
      required: true,
    },
    currentTrackOne: {
      type: Number,
      required: true,
    },
    maxECE: {
      type: Number,
      required: true,
    },
    currentECE: {
      type: Number,
      required: true,
    },
    maxEngSci: {
      type: Number,
      required: true,
    },
    currentEngSci: {
      type: Number,
      required: true,
    },
    maxChem: {
      type: Number,
      required: true,
    },
    currentChem: {
      type: Number,
      required: true,
    },
  },
  { strict: true, timestamps: true },
);

module.exports = mongoose.model('OlympiksEvent', OlympiksEventSchema);
