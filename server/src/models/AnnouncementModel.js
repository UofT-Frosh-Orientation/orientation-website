const mongoose = require('mongoose');

/**
 * Groups an announcement email can be sent to. Every audience is additionally
 * filtered by canEmail, so unsubscribes are always honoured.
 */
const ANNOUNCEMENT_AUDIENCES = ['all', 'frosh', 'unregisteredFrosh', 'registeredFrosh', 'leadurs'];

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
  // Persisted so there is a record of which announcements were emailed and to
  // whom; previously sendAsEmail was read off the request and then discarded.
  sendAsEmail: {
    type: Boolean,
    required: true,
    default: false,
  },
  audience: {
    type: String,
    required: true,
    enum: ANNOUNCEMENT_AUDIENCES,
    default: 'all',
  },
});

const AnnouncementModel = mongoose.model('Announcement', AnnouncementSchema);
/**
 * Global Announcement objet
 * @typedef {typeof AnnouncementModel.schema.obj} Announcement
 */
module.exports = AnnouncementModel;
