const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FaqSchema = new Schema(
  {
    question: {
      type: String,
      required: true,
    },
    answer: { type: String, required: true, default: '' },
    category: { type: String, default: 'General' },
    deleted: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  { strict: true },
);

const FaqModel = mongoose.model('FAQ', FaqSchema);

module.exports = FaqModel;
