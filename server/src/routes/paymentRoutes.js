const express = require('express');
const PaymentController = require('../controllers/PaymentController');
const bodyParser = require('body-parser');

const router = express.Router();

router.post('/stripe-callback', bodyParser.raw({ type: '*/*' }), PaymentController.handleWebhook);

module.exports = router;
