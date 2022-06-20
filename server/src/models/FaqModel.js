const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { DateTime } = require('luxon');

const FaqSchema = new Schema(
  {
    question: {
      type: String,
      required: true,
    },
    answer: { type: String, required: false, default: '' },
    category: { type: String, default: 'General' },
    deleted: {
      type: Boolean,
      required: true,
      default: false,
    },
    lastUpdated: { type: Date, required: true, default: Date.now },
  },
  { strict: true },
);

FaqSchema.virtual('lastUpdated_formatted').get(function () {
  return DateTime.fromJSDate(this.lastUpdated).toLocaleString(DateTime.DATETIME_SHORT);
});

const FaqModel = mongoose.model('FAQ', FaqSchema);

module.exports = FaqModel;
