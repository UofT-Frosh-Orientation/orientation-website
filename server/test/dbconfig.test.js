const mongoose = require('mongoose');
const mongoURI = `mongodb://admin:root@localhost:27017/testingDatabase?authSource=admin`;

mongoose.connect(mongoURI);

mongoose.connection
  .once('open', () =>
    mongoose.connection.dropDatabase().then(() => {
      done();
    }),
  )
  .on('error', (error) => {
    console.warn('Error : ', error);
  });

// Drop the database before each test
beforeEach((done) => {
  if (mongoose.connection.readyState === 0) {
    mongoose.connect(mongoURI, (err) => {
      if (err) throw err;
      return done();
    });
  }
  done();
});
