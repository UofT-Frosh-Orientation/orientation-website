const express = require('express');
const router = express.Router();

const FaqController = require('../controllers/FaqController');
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: false });

// POST request for creating question
router.post('/faq/create', FaqController.questionCreate_post);

// GET request to delete question
router.delete('/faq/:faq_id', FaqController.questionDelete_get);

// GET request to update question
router.patch('/faq/:faq_id', FaqController.questionUpdate_get);

// GET request for list of all questions
router.get('/faq/all', FaqController.faqList);

module.exports = router;
