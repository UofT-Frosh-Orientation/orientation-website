const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const FroshModel = require('../models/FroshModel');

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

const PaymentServices = {
  /**
   * Decodes a webhook event from stripe and verifies that it was sent by stripe
   * @param {Buffer} data
   * @param {String} signature
   * @return {Promise<Stripe.Event>}
   */
  async decodeWebhookEvent(data, signature) {
    try {
      return await stripe.webhooks.constructEventAsync(data, signature, endpointSecret);
    } catch (err) {
      console.log('Stripe webhook verification failed', err.message);
      throw err;
    }
  },

  /**
   * Updates a payment for a given frosh.
   * @param {String} paymentId
   * @param {Number} amountReceived
   * @return {Promise<Query<Document<unknown, any, Omit<unknown, never>> & Omit<unknown, never> & {_id: Omit<unknown, never>["_id"]}, Document<unknown, any, Omit<unknown, never>> & Omit<unknown, never> & {_id: Omit<unknown, never>["_id"]}, {}, Omit<unknown, never>>>}
   */
  async updatePayment(paymentId, amountReceived) {
    try {
      const frosh = await FroshModel.findOne({ 'payments.paymentIntent': paymentId });
      console.log(frosh);
      const idx = frosh.payments.findIndex((p) => p.paymentIntent === paymentId);
      frosh.payments[idx].amountDue = frosh.payments[idx].amountDue - amountReceived;
      //TODO: update frosh balance
      await frosh.save();
      return frosh;
    } catch (e) {
      console.log(e);
    }
  },

  /**
   * Creates a checkout session for a user to pay with.
   * @param {String}email
   * @return {Promise<Stripe.Checkout.Session & {lastResponse: {headers: {[p: string]: string}, requestId: string, statusCode: number, apiVersion?: string, idempotencyKey?: string, stripeAccount?: string}}>}
   */
  async createCheckoutSession(email) {
    try {
      return await stripe.checkout.sessions.create({
        customer_email: email,
        submit_type: 'pay',
        billing_address_collection: 'auto',
        line_items: [
          {
            price: process.env.STRIPE_TICKET_PRICE_ID,
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
