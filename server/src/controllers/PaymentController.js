const PayServices = require('../services/PaymentServices');
const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

const stripe = require('stripe')(stripeSecretKey);
const express = require('express');
const app = express();
app.use(express.static('public'));

const YOUR_DOMAIN = 'http://localhost:5000';

const PaymentController = {
  async getPrice(req, res, next) {
    const listOfFrosh = await Frosh.find();
    const amount = listOfFrosh.length <= 99 ? '56.99' : '61.99'; // need to change prices and early bird??
    res.status(200).send(amount);
  },

  async calculateOrderAmount(req, res, next) {
    const amount = 60.0;
    res.status(200).send(amount);
  },

  async paymentIntent(req, res, next) {
    const { items } = req.body;

    // Create a PaymentIntent with the order amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
      amount: calculateOrderAmount(items),
      currency: 'cad',
      automatic_payment_methods: {
        enabled: true,
      },
    });

    res.send({
      clientSecret: paymentIntent.client_secret,
    });

    next();
  },
};
