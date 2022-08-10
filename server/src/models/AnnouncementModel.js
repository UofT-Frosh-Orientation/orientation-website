const mongoose = require('mongoose');

const AnnouncementSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  dateCreated: {
    type: Date,
    required: true,
    default: Date.now,
  },
  completed: {
    type: Boolean,
    required: true,
    default: false,
  },
});

const AnnouncementModel = mongoose.model('Announcement', AnnouncementSchema);

module.exports = AnnouncementModel;
