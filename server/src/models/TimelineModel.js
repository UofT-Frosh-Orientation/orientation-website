const mongoose = require('mongoose');

const TimelineSchema = new mongoose.Schema(
  {
    date: {
      type: Date,
      required: true,
    },
    eventName: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: false,
    },
    link: {
      type: String,
      required: false,
    },
    linkLabel: {
      type: String,
      required: false,
    },
  },
  { strict: true, timestamps: true },
);

const TimelineModel = mongoose.model('Timeline', TimelineSchema);

module.exports = TimelineModel;
