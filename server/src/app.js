const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const registrationSubscription = require('./subscribers/registrationDataSubscriber');

registrationSubscription.add({}, { repeat: { cron: '0 9 * * *' } });

const app = express();

const corsOptions = {
  credentials: true,
  origin: [process.env.CLIENT_BASE_URL, process.env.API_BASE_URL, 'https://checkout.stripe.com'],
};

app.use(cors(corsOptions));

app.use('/payment/stripe-callback', bodyParser.raw({ type: '*/*' }));
app.use(bodyParser.json());

module.exports = app;
