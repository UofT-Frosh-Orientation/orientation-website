const FaqQuestionModel = require('../models/FaqQuestionModel');
const FaqServices = require('../services/FaqServices')

const FaqController = {
  // Display list of all questions
  async faqList(req, res, next) {
    try {
      const answeredQuestions = await FaqServices.getAnsweredQuestions();
      res.status(200).send({faqs: answeredQuestions})
    } catch (err) {
      next(err)
    }
  },

  // Handle question create on POST.
  async questionCreate_post(req, res, next) {
    res.send('NOT IMPLEMENTED YET');
  },

  // Display question delete form on GET.
  async questionDelete_get(req, res, next) {
    res.send('NOT IMPLEMENTED YET');
  },


  // Display question update form on GET.
  async questionUpdate_get(req, res, next) {
    res.send('NOT IMPLEMENTED YET');
  },
};

module.exports = FaqController;
