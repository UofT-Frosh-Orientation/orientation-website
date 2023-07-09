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
      req.log.fatal({msg: "Unable to get answered FAQ questions", err});
      next(err);
    }
  },

  /**
   * Gets all unanswered FAQs.
   * @param {Object} req
   * @param {Object} res
   * @param {Function} next
   * @async
   * @return {Promise<void>}
   */
  async getUnansweredFaqList(req, res, next) {
    try {
      const unansweredQuestions = await FaqServices.getUnansweredQuestions();
      res.status(200).send({ faqs: unansweredQuestions });
    } catch (err) {
      req.log.fatal({msg: "Unable to get unanswered FAQ questions", err});
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
      req.log.fatal({msg: "Unable to get all FAQ questions", err});
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
      const { email, question, category } = req.body;
      // Don't allow frosh to post an answer - set it to undefined
      const newFaq = await FaqServices.createNewQuestion(email, question, undefined, category);
      res.status(200).send(newFaq.toObject());
    } catch (err) {
      req.log.fatal({msg: "Unable to create FAQ question", err});
      next(err);
    }
  },

  /**
   * Creates a new question that can be marked as answered in mongo and returns the question to the frontend.
   * @param {Object} req
   * @param {Object} res
   * @param {Function} next
   * @async
   * @return {Promise<void>}
   */
  async createQuestionWithAns(req, res, next) {
    try {
      const { email, question, answer, category } = req.body;
      const newFaq = await FaqServices.createNewQuestion(email, question, answer, category);
      res.status(200).send(newFaq.toObject());
    } catch (err) {
      req.log.fatal({msg: "Unable to create FAQ question with answer", err});
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
      req.log.fatal({msg: "Unable to delete FAQ question", err});
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
      console.log(update);
      update.isAnswered = update.answer ? true : false;
      const updatedFaq = await FaqServices.updateQuestion(faqId, update);
      res.status(200).send(updatedFaq.toObject());
    } catch (err) {
      req.log.fatal({msg: "Unable to update FAQ question", err});
      next(err);
    }
  },
};

module.exports = FaqController;
