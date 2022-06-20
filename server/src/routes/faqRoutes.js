const express = require('express');

const FaqController = require('../controllers/FaqController');
const checkLoggedIn = require('../middlewares/checkLoggedIn');
const hasAuthScopes = require('../middlewares/hasAuthScopes');

const router = express.Router();

/**
 * @swagger
 * /faq/create:
 *   post:
 *     summary: Create a new question for FAQs
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#components/schemas/NewFAQ'
 *     responses:
 *       '200':
 *         description: Successfully created new question
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#components/schemas/FAQ'
 *       '403':
 *         $ref: '#components/responses/NotLoggedIn'
 */
router.post('/create', checkLoggedIn, hasAuthScopes(['faq:create']), FaqController.createQuestion);

/**
 * @swagger
 * /faq/{faqId}:
 *   delete:
 *     parameters:
 *       - in: path
 *         name: faqId
 *         schema:
 *           type: string
 *         required: true
 *         description: id of the FAQ to delete
 *     responses:
 *       '200':
 *         description: The FAQ was successfully deleted
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#components/schemas/FAQ'
 *       '403':
 *         $ref: '#components/responses/NotLoggedIn'
 */
router.delete(
  '/:faqId',
  checkLoggedIn,
  hasAuthScopes(['faq:delete']),
  FaqController.deleteQuestion,
);

/**
 * @swagger
 * /faq/{faqId}:
 *   patch:
 *     parameters:
 *       - in: path
 *         name: faqId
 *         schema:
 *           type: string
 *         required: false
 *         description: id of the FAQ to delete
 *     responses:
 *       '200':
 *         description: The FAQ was successfully deleted
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#components/schemas/FAQ'
 *       '403':
 *         $ref: '#components/responses/NotLoggedIn'
 */
router.patch('/:faqId?', checkLoggedIn, hasAuthScopes(['faq:edit']), FaqController.updateQuestion);

/**
 * @swagger
 * /faq/answered:
 *   get:
 *     summary: Get all the answered FAQs
 *     responses:
 *       '200':
 *         description: Successfully retrieved the answered FAQs
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 faqs:
 *                   type: array
 *                   items:
 *                     $ref: '#components/schemas/FAQ'
 */
router.get('/answered', FaqController.getAnsweredFaqList);

module.exports = router;
