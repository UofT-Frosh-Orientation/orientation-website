const mongoLoader = require('./loaders/mongoLoader');

const froshRouter = require('./routes/froshRoutes');

const app = express();

app.use(bodyParser.json());

app.use('/frosh', froshRouter);

app.get('*', (req, res) => {
  res.status(200).send('Hello, Calum!!');
});

const app = require('./app');

mongoLoader().then(() => {
  app.listen(process.env.PORT || 5001, () => {
    console.log(`Server is running on port: http://localhost:5001`);
  });
});
