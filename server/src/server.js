const express = require('express');
const bodyParser = require('body-parser');
const mongoLoader = require('./loaders/mongoLoader');
const swaggerLoader = require('./loaders/swaggerLoader');

const froshRouter = require('./routes/froshRoutes');

const app = express();

app.use(bodyParser.json());

app.use('/frosh', froshRouter);

swaggerLoader(app);

app.get('*', (req, res) => {
  res.status(200).send('Hello, Luke!');
});

mongoLoader().then(() => {
  app.listen(process.env.PORT || 5001, () => {
    console.log(`Server is running on port: http://localhost:5001`);
  });
});
