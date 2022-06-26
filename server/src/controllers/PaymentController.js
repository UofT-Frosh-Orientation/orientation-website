const PaymentServices = require('../services/PaymentServices');

const PaymentController = {
  async handleWebhook(req, res, next) {
    let event;
    const signature = req.headers['stripe-signature'];
    try {
      event = await PaymentServices.decodeWebhookEvent(req.body, signature);
    } catch (err) {
      next(new Error('UNAUTHORIZED'));
    }
    try {
      switch (event.type) {
        case 'payment_intent.succeeded': {
          const paymentIntent = event.data.object;
          console.log(paymentIntent);
          // update frosh model to have paid successfully
          break;
        }
        default:
          console.log(`Unhandled event type: ${event.type}`);
      }
      res.s;
    } catch (err) {
      next(err);
    }
  },
};

module.exports = PaymentController;
