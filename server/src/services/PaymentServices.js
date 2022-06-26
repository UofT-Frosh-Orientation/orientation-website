const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

const PaymentServices = {
  async decodeWebhookEvent(data, signature) {
    try {
      return await stripe.webhooks.constructEventAsync(data, signature, endpointSecret);
    } catch (err) {
      console.log('Stripe webhook verification failed', err.message);
      throw err;
    }
  },
};

module.exports = PaymentServices;
