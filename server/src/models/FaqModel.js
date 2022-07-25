const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FaqSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
    },
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
    isAnswered: {
      type: Boolean,
      required: true,
      default: false,
    },
    dateAsked: {
      type: Date,
      required: true,
      default: new Date(),
    },
    lastUpdated: {
      type: Date,
      required: true,
      default: new Date(),
    },
  },
  { strict: true },
);

const FaqModel = mongoose.model('FAQ', FaqSchema);

module.exports = FaqModel;
