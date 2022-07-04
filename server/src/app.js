const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

const corsOptions = {
  credentials: true,
  origin: [process.env.CLIENT_BASE_URL, process.env.API_BASE_URL],
};

app.use(cors(corsOptions));

app.use('/payment/stripe-callback', bodyParser.raw({ type: '*/*' }));
app.use(bodyParser.json());

module.exports = app;
