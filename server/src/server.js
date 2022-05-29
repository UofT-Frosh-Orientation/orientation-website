const mongoLoader = require('./loaders/mongoLoader');
const app = require('./app');

mongoLoader().then(() => {
  app.listen(process.env.PORT || 5001, () => {
    console.log(`Server is running on port: http://localhost:5001`);
  });
});
