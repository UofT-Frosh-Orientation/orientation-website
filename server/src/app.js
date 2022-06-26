const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use('/payment/stripe-callback', bodyParser.raw({ type: '*/*' }));
app.use(bodyParser.json());

module.exports = app;
