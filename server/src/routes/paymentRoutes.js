const express = require('express');
const PaymentController = require('../controllers/PaymentController');
const checkLoggedIn = require('../middlewares/checkLoggedIn');
const checkUserType = require('../middlewares/checkUserType');

const router = express.Router();

// router.post('/checkout', PaymentController.createCheckout);

router.post('/stripe-callback', PaymentController.handleWebhook);

router.get(
  '/frosh-retreat-remaining-tickets',
  checkLoggedIn,
  PaymentController.froshRetreatTicketCount,
);

router.post(
  '/frosh-retreat-payment',
  checkLoggedIn,
  checkUserType('frosh'),
  PaymentController.froshRetreatPayment,
);

module.exports = router;
