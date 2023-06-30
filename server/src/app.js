const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const registrationSubscription = require('./subscribers/registrationDataSubscriber');
const {logger, loggerMiddleware} = require('./util/logger');
registrationSubscription.add({}, { repeat: { cron: '0 9 * * *' } });

const app = express();

app.use(loggerMiddleware);

const corsOptions = {
  credentials: true,
  origin: [
    process.env.CLIENT_BASE_URL,
    process.env.API_BASE_URL,
    'https://checkout.stripe.com',
    'https://www.orientation.skule.ca',
  ],
};

app.use(cors(corsOptions));

app.use('/payment/stripe-callback', bodyParser.raw({ type: '*/*' }));
app.use(bodyParser.json());

module.exports = app;
