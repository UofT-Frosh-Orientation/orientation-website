const mongoLoader = require('./loaders/mongoLoader');
const passportLoader = require('./loaders/passportLoader');
const app = require('./app');

mongoLoader(app).then(() => {
  passportLoader(app);
  app.listen(process.env.PORT || 5001, () => {
    console.log(`Server is running on port: http://localhost:5001`);
  });
});
