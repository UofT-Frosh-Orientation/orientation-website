const express = require('express');
const { getPrice, paymentIntent } = require('../controllers/PayController');
const router = express.Router();

router.post('/getPrice', getPrice);

// router.post('/create-checkout-session', checkoutSession);
router.post('/create-payment-intent', paymentIntent);


module.exports = router;