const mongoLoader = require('./loaders/mongoLoader');
const passportLoader = require('./loaders/passportLoader');

const app = require('./app');
const froshRouter = require('./routes/froshRoutes');
const userRouter = require('./routes/userRoutes');
const timelineRouter = require('./routes/timelineRoutes');

const swaggerLoader = require('./loaders/swaggerLoader');

mongoLoader(app).then(() => {
  passportLoader(app);
  app.use('/frosh', froshRouter);
  app.use('/user', userRouter);
  app.use('/timeline', timelineRouter);

  swaggerLoader(app);

  app.get('*', (req, res) => {
    res.status(200).send('Hello, Luke!');
  });
  app.listen(process.env.PORT || 5001, () => {
    console.log(`Server is running on port: http://localhost:5001`);
  });
});
