const PaymentServices = require('../services/PaymentServices');

const PaymentController = {
  async handleWebhook(req, res, next) {
    // console.log(req)
    let event;
    const signature = req.headers['stripe-signature'];
    try {
      event = await PaymentServices.decodeWebhookEvent(req.body, signature);
      // console.log("event", event)
    } catch (err) {
      next(new Error('UNAUTHORIZED'));
    }
    console.log(event.type);
    try {
      switch (event.type) {
        case 'payment_intent.succeeded': {
          const paymentIntent = event.data.object;
          console.log(paymentIntent);
          console.log('Handling payment intent');
          // update frosh model to have paid successfully
          break;
        }
        default:
          console.log(`Unhandled event type: ${event.type}`);
      }
      res.status(200).send({ message: 'Success!' });
    } catch (err) {
      next(err);
    }
  },
};

module.exports = PaymentController;
