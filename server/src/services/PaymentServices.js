const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const FroshModel = require('../models/FroshModel');

const PaymentServices = {
  /**
   * Decodes a webhook event from stripe and verifies that it was sent by stripe
   * @param {Buffer} data
   * @param {String} signature
   * @return {Promise<Stripe.Event>}
   */
  async decodeWebhookEvent(data, signature) {
    const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;
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
      frosh.authScopes = { requested: [], approved: [] };
      console.log(frosh);
      const idx = frosh.payments.findIndex((p) => p.paymentIntent === paymentId);
      frosh.payments[idx].amountDue = frosh.payments[idx].amountDue - amountReceived;
      if (frosh.payments[idx].item === 'Orientation Ticket') {
        frosh.isRegistered = true;
      } else if (frosh.payments[idx].item === 'Retreat Ticket') {
        frosh.isRetreat = true;
      }
      //TODO: update frosh balance
      await frosh.save();
      return frosh;
    } catch (e) {
      console.log(e);
    }
  },

  async getNonExpiredPaymentsCountForItem(item) {
    return new Promise((resolve, reject) => {
      FroshModel.where({ 'payments.expired': false, 'payments.item': item }).count((err, count) => {
        if (err) {
          reject(err);
        } else {
          resolve(count);
        }
      });
    });
  },

  /**
   * Creates a checkout session for a user to pay with.
   * @param {String} email
   * @param {String} type
   * @return {Promise<Stripe.Checkout.Session & {lastResponse: {headers: {[p: string]: string}; requestId: string; statusCode: number; apiVersion?: string; idempotencyKey?: string; stripeAccount?: string}}>}
   */
  async createCheckoutSession(email, type = 'orientation') {
    const products = {
      orientation: {
        priceId: process.env.STRIPE_TICKET_PRICE_ID,
        relativeUrlSuccess: '/registration-success',
        relativeUrlFailure: '/payment-error',
      },
      retreat: {
        priceId: process.env.STRIPE_RETREAT_PRICE_ID,
        relativeUrlSuccess: '/registration-success-retreat',
        relativeUrlFailure: '/payment-error-retreat',
      },
    };
    try {
      return await stripe.checkout.sessions.create({
        customer_email: email,
        submit_type: 'pay',
        expires_at: type === 'retreat' ? Math.floor(Date.now() / 1000 + 30 * 60) : undefined,
        billing_address_collection: 'auto',
        line_items: [
          {
            price: products[type]?.priceId ?? products['orientation'].priceId,
            quantity: 1,
          },
        ],
        discounts:
          type === 'orientation'
            ? [
                {
                  coupon: process.env.STRIPE_EARLY_BIRD_COUPON_ID,
                },
              ]
            : [],
        mode: 'payment',
        success_url: `${process.env.CLIENT_BASE_URL}${
          products[type]?.relativeUrlSuccess ?? products['orientation'].relativeUrlSuccess
        }`,
        cancel_url: `${process.env.CLIENT_BASE_URL}${
          products[type]?.relativeUrlFailure ?? products['orientation'].relativeUrlFailure
        }`,
      });
    } catch (err) {
      if (err.raw?.code === 'coupon_expired') {
        try {
          return await stripe.checkout.sessions.create({
            customer_email: email,
            submit_type: 'pay',
            expires_at: type === 'retreat' ? Math.floor(Date.now() / 1000 + 30 * 60) : undefined,
            billing_address_collection: 'auto',
            line_items: [
              {
                price: products[type]?.priceId ?? products['orientation'].priceId,
                quantity: 1,
              },
            ],
            mode: 'payment',
            success_url: `${process.env.CLIENT_BASE_URL}${
              products[type]?.relativeUrlSuccess ?? products['orientation'].relativeUrlSuccess
            }`,
            cancel_url: `${process.env.CLIENT_BASE_URL}${
              products[type]?.relativeUrlFailure ?? products['orientation'].relativeUrlFailure
            }`,
          });
        } catch (e) {
          console.log('Error creating checkout session', e.message);
        }
      }
      console.log('Error creating checkout session', err.message);
      throw err;
    }
  },
  async expirePayment(paymentIntent) {
    try {
      const frosh = await FroshModel.findOne({ 'payments.paymentIntent': paymentIntent });
      frosh.authScopes = { requested: [], approved: [] };
      frosh.payments.forEach((p) => {
        if (p.paymentIntent === paymentIntent) {
          p.expired = true;
        }
      });
      await frosh.save({});
      return frosh;
    } catch (e) {
      console.log(e);
      throw e;
    }
  },
};

module.exports = PaymentServices;
