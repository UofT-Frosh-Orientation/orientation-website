const mongoose = require('mongoose');

const TimelineSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },

});

const TimelineModel = mongoose.model('Timeline', TimelineSchema);

module.exports = TimelineModel;
