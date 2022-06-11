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
    required: true,
  },
});

const TimelineModel = mongoose.model('Frosh', TimelineSchema);

module.exports = TimelineModel;
