const express = require('express');
const bodyParser = require('body-parser');
const mongoLoader = require('./loaders/mongoLoader');

const froshRouter = require('./routes/froshRoutes');

const app = express();

app.use(bodyParser.json());

app.get('*', (req, res) => {
  res.status(200).send('Hello, Luke!');
});

app.use('/frosh', froshRouter);

mongoLoader().then(() => {
  app.listen(process.env.PORT || 5001, () => {
    console.log(`Server is running on port: http://localhost:5001`);
  });
});
