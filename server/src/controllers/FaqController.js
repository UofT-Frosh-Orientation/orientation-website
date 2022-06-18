const FaqQuestionModel = require('../models/FaqQuestionModel');

const FaqController = {
  // Display list of all questions
  async faqList(req, res, next) {
    FaqQuestionModel.find()
      .sort({ lastUpdated: -1 }) //sorts with latest to oldest last updated
      .exec(function (err, faq_list) {
        if (err) {
          return next(err);
        }
        res.send(faq_list);
      });
  },

  // Display detail page for a specific question
  async questionDetail(req, res, next) {
    FaqQuestionModel.findById(req.params.id).exec(function (err, question) {
      if (err) {
        return next(err);
      }
      if (question == null) {
        // No results.
        var err = new Error('Question not found');
        err.status = 404;
        return next(err);
      }
      res.send(results.question);
    });
  },

  // Display new faqQuestion create form on GET.
  async questionCreate_get(req, res, next) {
    res.send('NOT IMPLEMENTED YET');
  },

  // Handle question create on POST.
  async questionCreate_post(req, res, next) {
    res.send('NOT IMPLEMENTED YET');
  },

  // Display question delete form on GET.
  async questionDelete_get(req, res, next) {
    res.send('NOT IMPLEMENTED YET');
  },

  // Handle question delete on POST.
  async questionDelete_post(req, res, next) {
    res.send('NOT IMPLEMENTED YET');
  },

  // Display question update form on GET.
  async questionUpdate_get(req, res, next) {
    res.send('NOT IMPLEMENTED YET');
  },

  // Handle question update on POST.
  async questionUpdate_post(req, res, next) {
    res.send('NOT IMPLEMENTED YET');
  },
};

module.exports = FaqController;
