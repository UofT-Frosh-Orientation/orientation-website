const FaqServices = require('../services/FaqServices');

const FaqController = {
  /**
   * Gets all answered FAQs.
   * @param {Object} req
   * @param {Object} res
   * @param {Function} next
   * @async
   * @return {Promise<void>}
   */
  async getAnsweredFaqList(req, res, next) {
    try {
      const answeredQuestions = await FaqServices.getAnsweredQuestions();
      res.status(200).send({ faqs: answeredQuestions });
    } catch (err) {
      next(err);
    }
  },

  /**
   * Gets all answered FAQs.
   * @param {Object} req
   * @param {Object} res
   * @param {Function} next
   * @async
   * @return {Promise<void>}
   */
  async getAllFaqList(req, res, next) {
    try {
      const allQuestions = await FaqServices.getAllQuestions();
      res.status(200).send({ faqs: allQuestions });
    } catch (err) {
      next(err);
    }
  },

  /**
   * Creates a new question in mongo and returns the question to the frontend.
   * @param {Object} req
   * @param {Object} res
   * @param {Function} next
   * @async
   * @return {Promise<void>}
   */
  async createQuestion(req, res, next) {
    try {
      const { question, category } = req.body;
      const newFaq = await FaqServices.createNewQuestion(question, category);
      res.status(200).send(newFaq.toObject());
    } catch (err) {
      next(err);
    }
  },

  /**
   * Soft deletes a question from mongo by id.
   * @param {Object} req
   * @param {Object} res
   * @param {Function} next
   * @async
   * @return {Promise<void>}
   */
  async deleteQuestion(req, res, next) {
    try {
      const { faqId } = req.params;
      await FaqServices.deleteQuestion(faqId);
      res.status(200).send({ message: 'Successfully deleted FAQ!', deletedId: faqId });
    } catch (err) {
      next(err);
    }
  },

  /**
   * Updates a question, and creates a new question if one does not exist.
   * @param {Object} req
   * @param {Object} res
   * @param {Function} next
   * @async
   * @return {Promise<void>}
   */
  async updateQuestion(req, res, next) {
    try {
      const { faqId } = req.params;
      const update = req.body;
      const updatedFaq = await FaqServices.updateQuestion(faqId, update);
      res.status(200).send(updatedFaq.toObject());
    } catch (err) {
      next(err);
    }
  },
};

module.exports = FaqController;
