const mongoose = require('mongoose');

/**
 * Submissions from the hidden Skule™ Hunt easter-egg trail (see
 * `client/src/pages/Chief/Chief.jsx`).
 *
 * The trail is open to anyone who solves it, logged in or not, so the hunter's
 * identity is self-reported: name, email and team number are typed into the
 * form (prefilled from the session when there is one) purely so points can be
 * awarded manually afterwards. Nothing here is authenticated — treat it as a
 * claim to be checked against the team list, not as proof of identity.
 */
const EasterEggSubmissionSchema = new mongoose.Schema(
  {
    // Which easter egg produced this, so a future egg can reuse the collection.
    prompt: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
      maxLength: 100,
    },
    email: {
      type: String,
      required: true,
      maxLength: 254,
    },
    scuntTeam: {
      type: String,
      required: true,
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

const EasterEggSubmissionModel = mongoose.model('EasterEggSubmission', EasterEggSubmissionSchema);

module.exports = EasterEggSubmissionModel;
