const mongoose = require('mongoose');

const AnnouncementSchema = new mongoose.Schema({
  description: {
    type: String,
  },
});

const AnnouncementModel = mongoose.model('Announcement', AnnouncementSchema);

module.exports = AnnouncementModel;
