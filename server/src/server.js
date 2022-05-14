const express = require('express');
const mongoLoader = require('./loaders/mongoLoader');

const app = express();

app.get('*', (req, res) => {
  res.status(200).send('Hello, Frosh Week!');
});

mongoLoader().then(() => {
  app.listen(process.env.PORT || 5001, () => {
    console.log(`Server is running on port: http://localhost:5001`);
  });
});
