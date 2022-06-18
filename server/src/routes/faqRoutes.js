const express = require('express');
const router = express.Router();

const FaqController = require('../controllers/FaqController');
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: false });

// GET request for creating question
router.get('/faq/create', FaqController.questionCreate_get);

// POST request for creating question
router.post('/faq/create', FaqController.questionCreate_post);

// GET request to delete question
router.get('/faq/:id/delete', FaqController.questionDelete_get);

// POST request to delete question
router.post('/faq/:id/delete', FaqController.questionDelete_post);

// GET request to update question
router.get('/faq/:id/update', FaqController.questionUpdate_get);

// POST request to update question
router.post('/faq/:id/update', FaqController.questionUpdate_post);

// GET request for showing question detail
router.get('/faq/:id', FaqController.questionDetail);

// GET request for list of all questions
router.get('/faq/all', FaqController.faqList);

module.exports = router;
