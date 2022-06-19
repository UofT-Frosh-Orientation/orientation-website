const express = require('express');

const FaqController = require('../controllers/FaqController');
const checkLoggedIn = require('../middlewares/checkLoggedIn');
const hasAuthScopes = require('../middlewares/hasAuthScopes');

const router = express.Router();

// POST request for creating question
router.post(
  '/faq/create',
  checkLoggedIn,
  hasAuthScopes(['faq:create']),
  FaqController.createQuestion,
);

// GET request to delete question
router.delete(
  '/faq/:faqId',
  checkLoggedIn,
  hasAuthScopes(['faq:delete']),
  FaqController.deleteQuestion,
);

// GET request to update question
router.patch(
  '/faq/:faqId?',
  checkLoggedIn,
  hasAuthScopes(['faq:edit']),
  FaqController.updateQuestion,
);

// GET request for list of all questions
router.get('/faq/all', FaqController.getAnsweredFaqList);

module.exports = router;
