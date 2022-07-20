const express = require('express');
const PaymentController = require('../controllers/PaymentController');

const router = express.Router();

// router.post('/checkout', PaymentController.createCheckout);

router.post('/stripe-callback', PaymentController.handleWebhook);

module.exports = router;
