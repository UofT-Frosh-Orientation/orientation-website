const express = require('express');
const bodyParser = require('body-parser');
const swaggerLoader = require('./loaders/swaggerLoader');

const froshRouter = require('./routes/froshRoutes');

const app = express();

app.use(bodyParser.json());

app.use('/frosh', froshRouter);

swaggerLoader(app);

app.get('*', (req, res) => {
  res.status(200).send('Hello, Luke!');
});

module.exports = app;
