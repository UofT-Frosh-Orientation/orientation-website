const mongoose = require('mongoose');

/**
 * Submissions from the hidden Skule™ Hunt easter-egg trail (see
 * `client/src/pages/Chief/Chief.jsx`).
 *
 * Hunters must be signed in to submit, so name / email / team are copied off
 * the session's user document rather than typed — they are here so points can
 * be awarded by hand without a second lookup, and they are a snapshot of the
 * profile at submit time (a later team reassignment will not update them).
 *
 * One submission per user per prompt, enforced by the unique index below.
 */
const EasterEggSubmissionSchema = new mongoose.Schema(
  {
    // Which easter egg produced this, so a future egg can reuse the collection.
    prompt: {
      type: String,
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    name: {
      type: String,
      required: true,
      maxLength: 200,
    },
    email: {
      type: String,
      required: true,
      maxLength: 254,
    },
    scuntTeam: {
      type: String,
      required: false,
      default: '',
      maxLength: 50,
    },
    response: {
      type: String,
      required: true,
      maxLength: 2000,
    },
  },
  { strict: true, timestamps: true },
);

// Makes "one submission each" a database guarantee rather than a check that two
// simultaneous requests could both slip past.
EasterEggSubmissionSchema.index({ prompt: 1, userId: 1 }, { unique: true });

const EasterEggSubmissionModel = mongoose.model('EasterEggSubmission', EasterEggSubmissionSchema);

module.exports = EasterEggSubmissionModel;
