const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const registrationSubscription = require('./subscribers/registrationDataSubscriber');
const { loggerMiddleware } = require('./util/logger');
registrationSubscription.add({}, { repeat: { cron: '0 9 * * *' } });

const app = express();

app.use(loggerMiddleware);

const corsOptions = {
  origin: '*',
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions)); // handle preflight requests for all routes


app.use('/payment/stripe-callback', bodyParser.raw({ type: '*/*' }));
app.use(bodyParser.json());

module.exports = app;
