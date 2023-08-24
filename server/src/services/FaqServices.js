/**
 * Global Faq objet
 * @typedef {import("../models/FaqModel").Faq} Faq
 */
const FaqModel = require('../models/FaqModel');

const FaqServices = {
  /**
   * @description Gets all the questions.
   * @return {Faq[]} all the questions
   */
  async getAll() {
    return FaqModel.find({ deleted: false }).then(
      (faqs) => {
        if (!faqs.length) throw new Error('FAQS_NOT_FOUND');
        return faqs;
      },
      (error) => {
        throw new Error('UNABLE_TO_GET_FAQS', { cause: error });
      },
    );
  },

  /**
   * @description Gets all the answered questions.
   * @returns {Faq[]}
   */
  async getAnswered() {
    return FaqModel.find({ isAnswered: true, deleted: false }).then(
      (faqs) => {
        if (!faqs.length) throw new Error('FAQS_NOT_FOUND');
        return faqs;
      },
      (error) => {
        throw new Error('UNABLE_TO_GET_ANSWERED_FAQS', { cause: error });
      },
    );
  },

  /**
   * @description Gets all the unanswered questions.
   * @returns {Faq[]}
   */
  async getUnanswered() {
    return FaqModel.find({ isAnswered: false, deleted: false }).then(
      (faqs) => {
        if (!faqs.length) throw new Error('FAQS_NOT_FOUND');
        return faqs;
      },
      (error) => {
        throw new Error('UNABLE_TO_GET_UNANSWERED_FAQS', { cause: error });
      },
    );
  },

  /**
   * @description Creates a new question and returns the question.
   * @param {String} email email of the user
   * @param {String} question question asked by the user
   * @param {String} answer answer to the question
   * @param {String} category category of the question
   * @returns {Faq}
   */
  async create(email, question, answer, category) {
    let doc = {};
    if (answer) {
      if (category) {
        doc = { email, question, answer, category, isAnswered: true };
      } else {
        doc = { email, question, answer, isAnswered: true };
      }
    } else if (category) {
      doc = { email, question, category };
    } else {
      doc = { email, question };
    }

    return FaqModel.create(doc).then(
      (faq) => faq,
      (error) => {
        throw new Error('UNABLE_TO_CREATE_FAQ', { cause: error });
      },
    );
  },

  /**
   * @description Soft deletes a question by id.
   * @param {String} faqId - id of the FAQ to be deleted
   * @return {Faq} - the FAQ which was deleted
   */
  async delete(faqId) {
    return FaqModel.findByIdAndUpdate(faqId, { deleted: true }).then(
      (faq) => {
        if (!faq) throw new Error('FAQ_NOT_FOUND');
        return faq;
      },
      (error) => {
        throw new Error('UNABLE_TO_DELETE_FAQ', { cause: error });
      },
    );
  },

  /**
   * @description Updates a question by ID, and creates a new one if the ID is null or undefined
   * @param {String|null|undefined} faqId - id of the FAQ to be updated
   * @param {Faq} update - the update to be made to the FAQ
   * @return {Faq} - the updated FAQ
   */
  async update(faqId, update) {
    return FaqModel.findByIdAndUpdate(faqId, update, {
      new: true,
      runValidators: true,
    }).then(
      (faq) => {
        if (!faq) throw new Error('FAQ_NOT_FOUND');
        return faq;
      },
      (error) => {
        throw new Error('UNABLE_TO_UPDATE_FAQ', { cause: error });
      },
    );
  },
};

module.exports = FaqServices;
