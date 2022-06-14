const mongoose = require('mongoose');

const UserModel = require('./UserModel');

const ScheduleSchema = new mongoose.Schema({
  froshGroup: { type: String, required: false },
  date: {
    type: String,
    required: false,
  },
  events: {
    type: [
      {
        name: { type: String, required: false },
        description: { type: String, required: false },
        time: { type: String, required: false },
      },
    ],
  },
});

const ScheduleModel = mongoose.model('schedule', ScheduleSchema);

module.exports = ScheduleModel;
