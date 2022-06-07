const mongoose = require('mongoose');
const session = require('express-session')
const MongoStore = require("connect-mongo");

const loadMongo = async (app) => {
  console.log('Loading mongo...');
  const { MONGODB_PASSWORD, MONGODB_HOST, MONGODB_USER } = process.env;
  const mongoURI = `mongodb://${MONGODB_USER}:${MONGODB_PASSWORD}@${
    process.env.NODE_ENV === 'production' ? MONGODB_HOST : 'mongo-dev'
  }:27017/?authSource=admin`;
  await mongoose.connect(mongoURI);
  console.log('Connected to mongo!');
  app.use(session({
    resave: false,
    saveUninitialized: true,
    store: new MongoStore({ mongoUrl: mongoURI, crypto: {secret: process.env.SESSION_SECRET }})
  }))
};

module.exports = loadMongo;
