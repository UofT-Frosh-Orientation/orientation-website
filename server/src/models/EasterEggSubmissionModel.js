const mongoose = require('mongoose');

/**
 * Submissions from the hidden Skule™ Hunt easter-egg trail (see
 * `client/src/pages/Chief/Chief.jsx`). Intentionally anonymous — the trail is
 * open to anyone who solves it, logged in or not — so nothing here is PII
 * beyond what the hunter chooses to type.
 */
const EasterEggSubmissionSchema = new mongoose.Schema(
  {
    // Which easter egg produced this, so a future egg can reuse the collection.
    prompt: {
      type: String,
      required: true,
    },
    response: {
      type: String,
      required: true,
      maxLength: 2000,
    },
  },
  { strict: true, timestamps: true },
);

const EasterEggSubmissionModel = mongoose.model('EasterEggSubmission', EasterEggSubmissionSchema);

module.exports = EasterEggSubmissionModel;
