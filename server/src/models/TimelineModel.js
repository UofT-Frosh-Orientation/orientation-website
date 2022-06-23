const mongoose = require('mongoose');

const TimelineSchema = new mongoose.Schema({
  date: {
    type: Date,
    default: Date.now(),
    // required: true,
  },
  name: {
    type: String,
    // required: true,
  },
  description: {
    type: String,
    // required: true,
  },
});

const TimelineModel = mongoose.model('Timeline', TimelineSchema);

module.exports = TimelineModel;
