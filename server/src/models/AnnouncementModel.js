const mongoose = require('mongoose');

const AnnouncementSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
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
/**
 * Global Announcement objet
 * @typedef {typeof AnnouncementModel.schema.obj} Announcement
 */
module.exports = AnnouncementModel;
