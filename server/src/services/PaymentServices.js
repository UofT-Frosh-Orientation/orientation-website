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
  async createCheckoutSession(email) {
    try {
      return await stripe.checkout.sessions.create({
        customer_email: email,
        submit_type: 'pay',
        billing_address_collection: 'auto',
        line_items: [
          {
            price: 'price_0LGleVWMt7jVQMU3YBAJ5jP1',
            quantity: 1,
          },
        ],
        mode: 'payment',
        success_url: 'http://localhost:3000/registration-success',
        cancel_url: 'http://localhost:3000/payment-error',
      });
    } catch (err) {
      console.log('Error creating checkout session', err.message);
      throw err;
    }
  },
};

module.exports = PaymentServices;
