const express = require('express');
const router = express.Router();
const { getPrice, paymentIntent } = require('../controllers/PaymentController');

router.post('/getPrice', getPrice);

// router.post('/create-checkout-session', checkoutSession);
router.post('/create-payment-intent', paymentIntent);
