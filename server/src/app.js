const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const registrationSubscription = require('./subscribers/registrationDataSubscriber');
const { loggerMiddleware } = require('./util/logger');
registrationSubscription.add({}, { repeat: { cron: '0 12 * * *' } });
// registrationSubscription.add({}, { repeat: { cron: '* * * * *' } });

const app = express();

app.use(loggerMiddleware);

const corsOptions = {
  credentials: true,
  origin: [
    process.env.CLIENT_BASE_URL,
    process.env.API_BASE_URL,
    'https://checkout.stripe.com',
    'https://www.beta.orientation.skule.ca',
    'https://beta.orientation.skule.ca',
    'https://orientation.skule.ca',
    'https://www.orientation.skule.ca',
    'https://api.orientation.skule.ca',
    'https://ww.api.orientation.skule.ca',
  ],
    methods: ['GET', 'POST', 'DELETE' ,'HEAD','PUT','PATCH'],
    optionsSuccessStatus: 200 //
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions)); // handle preflight requests for all routes


app.use('/payment/stripe-callback', bodyParser.raw({ type: '*/*' }));
app.use(bodyParser.json({ limit: '50mb' }));

module.exports = app;
