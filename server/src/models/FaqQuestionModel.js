const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { DateTime } = require('luxon');

const FaqSchema = new Schema({
  question: {
    type: String,
    required: true,
  },
  answer: { type: String, required: false, default: '' },
  lastUpdated: { type: Date, required: true, default: Date.now },
  category: { type: String, default: 'General' },
});

// Virtual property for formatting date for "lastUpdated"
FaqSchema.virtual('lastUpdated_formatted').get(function () {
  return DateTime.fromJSDate(this.lastUpdated).toLocaleString(DateTime.DATETIME_SHORT);
});

module.exports = FaqModel;
