const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FaqSchema = new Schema(
  {
    email: {
      type: String,
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
  },
  { strict: true, timestamps: true },
);

const FaqModel = mongoose.model('FAQ', FaqSchema);
/**
 * Global Faq objet
 * @typedef {typeof FaqModel.schema.obj} Faq
 */
module.exports = FaqModel;
