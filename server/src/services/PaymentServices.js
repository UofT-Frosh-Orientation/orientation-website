const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const FroshModel = require('../models/FroshModel');
const FroshGroupModel = require('../models/FroshGroupModel');

const PaymentServices = {
  /**
   * @description Decodes a webhook event from stripe and verifies that it was sent by stripe
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
   * @description Updates a payment for a given frosh.
   * @param {String} paymentId
   * @param {Number} amountReceived
   * @return {Promise<Query<Document<unknown, any, Omit<unknown, never>> & Omit<unknown, never> & {_id: Omit<unknown, never>["_id"]}, Document<unknown, any, Omit<unknown, never>> & Omit<unknown, never> & {_id: Omit<unknown, never>["_id"]}, {}, Omit<unknown, never>>>}
   */
  async updatePayment(paymentId, amountReceived) {
    try {
      const frosh = await FroshModel.findOne({ 'payments.paymentIntent': paymentId });
      if (frosh) {
        frosh.authScopes = { requested: [], approved: [] };
        const idx = frosh.payments.findIndex((p) => p.paymentIntent === paymentId);
        frosh.payments[idx].amountDue = frosh.payments[idx].amountDue - amountReceived;
        if (frosh.payments[idx].item === 'Orientation Ticket') {
          frosh.isRegistered = true;
        } else if (frosh.payments[idx].item === 'Retreat Ticket') {
          frosh.isRetreat = true;
        }
        await frosh.save({ validateModifiedOnly: true });
        console.log('Frosh payment completed! Frosh info: ', frosh);
        await FroshGroupModel.findOneAndUpdate(
          { name: frosh.froshGroup },
          { $inc: { totalNum: 1 } },
          { new: true },
        ).then((doc) => {
          console.log(`Group ${doc.name} total: ${doc.totalNum}`);
        });
        return frosh;
      }
      return null;
    } catch (error) {
      throw new Error('UNABLE_TO_UPDATE_PAYMENT', { cause: error });
    }
  },

  /**
   * @description Gets the number of non-expired payments for a given item.
   * @param {Object} item payment item
   * @returns {Number} number of non-expired payments for a given item
   */
  async getNonExpiredPaymentsCountForItem(item) {
    return FroshModel.countDocuments({
      payments: { $elemMatch: { item, expired: false } },
    }).then(
      (count) => count,
      (error) => {
        throw new Error('UNABLE_TO_GET_COUNT_OF_PAYMENTS', { cause: error });
      },
    );
  },

  /**
   * @description Creates a checkout session for a user to pay with.
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

  /**
   * @description Expires a checkout session.
   * @param {Object} paymentIntent payment intent object
   * @returns {Frosh}
   */
  async expirePayment(paymentIntent) {
    try {
      const frosh = await FroshModel.findOne({ 'payments.paymentIntent': paymentIntent });
      if (!frosh) {
        return null;
      }
      frosh.authScopes = { requested: [], approved: [] };
      frosh.payments.forEach((p) => {
        if (p.paymentIntent === paymentIntent) {
          p.expired = true;
        }
      });
      await frosh.save({ validateModifiedOnly: true });
      return frosh;
    } catch (e) {
      console.log(e);
      throw e;
    }
  },
};

module.exports = PaymentServices;
