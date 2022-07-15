const FaqModel = require('../models/FaqModel');
const mongoose = require('mongoose');

const FaqServices = {
  /**
   * Gets all the questions (answered and unanswered) in mongo.
   * @async
   * @return {Promise<Array<Object>>} - all the questions
   */
  async getAllQuestions() {
    return new Promise((resolve, reject) => {
      FaqModel.find({ deleted: false }, (err, faqs) => {
        if (err) {
          reject(err);
        } else {
          resolve(faqs);
        }
      });
    });
  },

  /**
   * Gets all the answered questions in mongo.
   * @async
   * @return {Promise<Array<Object>>} - all the answered questions
   */
  async getAnsweredQuestions() {
    return new Promise((resolve, reject) => {
      FaqModel.find({ answer: { $ne: '' }, deleted: false }, (err, faqs) => {
        if (err) {
          reject(err);
        } else {
          resolve(faqs);
        }
      });
    });
  },

  /**
   * Creates a new question in mongo.
   * @param {String} question - the question being asked
   * @param {String} category - the category of the question being asked
   * @async
   * @return {Promise<Object>} - the new question
   */
  async createNewQuestion(email, question, category) {
    return new Promise((resolve, reject) => {
      const doc = category ? { email, question, category } : { email, question };
      FaqModel.create(doc, (err, newFaq) => {
        if (err) {
          reject(err);
        } else {
          resolve(newFaq);
        }
      });
    });
  },

  /**
   * Soft deletes a question by id.
   * @param {ObjectId} faqId - id of the FAQ to be deleted
   * @async
   * @return {Promise<Object>} - the FAQ which was deleted
   */
  async deleteQuestion(faqId) {
    return new Promise((resolve, reject) => {
      FaqModel.findByIdAndUpdate(faqId, { deleted: true }, (err, faq) => {
        if (err || !faq) {
          reject('UNABLE_TO_DELETE_FAQ');
        } else {
          resolve(faq);
        }
      });
    });
  },

  /**
   * Updates a question by ID, and creates a new one if the ID is null or undefined
   * @param {ObjectId|null|undefined} faqId - id of the FAQ to be updated
   * @param {Object} update - the update to be made to the FAQ
   * @return {Promise<Object>} - the updated FAQ
   */
  async updateQuestion(faqId, update) {
    return new Promise((resolve, reject) => {
      FaqModel.findOneAndUpdate(
        { _id: faqId ?? new mongoose.Types.ObjectId() },
        update,
        { upsert: true, new: true, runValidators: true },
        (err, faq) => {
          if (err || !faq) {
            reject('UNABLE_TO_UPDATE_FAQ');
          } else {
            resolve(faq);
          }
        },
      );
    });
  },
};

module.exports = FaqServices;
