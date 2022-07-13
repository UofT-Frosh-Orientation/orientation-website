const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo');

const FroshServices = require('../services/FroshServices');

const froshGroups = [
  {
    name: 'Alpha',
    symbol: 'α',
  },
  {
    name: 'Beta',
    symbol: 'β',
  },
  {
    name: 'Iota',
    symbol: 'ι',
  },
  {
    name: 'Phi',
    symbol: 'φ',
  },
  {
    name: 'Psi',
    symbol: 'ψ',
  },
  {
    name: 'Rho',
    symbol: 'ρ',
  },
  {
    name: 'Zeta',
    symbol: 'ζ',
  },
  {
    name: 'Gamma',
    symbol: 'γ',
  },
  {
    name: 'Omega',
    symbol: 'ω',
  },
  {
    name: 'Chi',
    symbol: 'χ',
  },
  {
    name: 'Upsilon',
    symbol: 'υ',
  },
  {
    name: 'Pi',
    symbol: 'π',
  },
  {
    name: 'Nu',
    symbol: 'ν',
  },
  {
    name: 'Delta',
    symbol: 'δ',
  },
  {
    name: 'Sigma',
    symbol: 'σ',
  },
  {
    name: 'Tau',
    symbol: 'τ',
  },
  {
    name: 'Kappa',
    symbol: 'κ',
  },
  {
    name: 'Theta',
    symbol: 'θ',
  },
  {
    name: 'Lambda',
    symbol: 'λ',
  },
  {
    name: 'Omicron',
    symbol: 'ο',
  },
];

const loadMongo = async (app) => {
  console.log('Loading mongo...');
  const { MONGODB_PASSWORD, MONGODB_HOST, MONGODB_USER } = process.env;
  const mongoURI = `mongodb://${MONGODB_USER}:${MONGODB_PASSWORD}@${
    process.env.NODE_ENV === 'production' ? MONGODB_HOST : 'mongo-dev'
  }:27017/orientation?authSource=admin`;
  await mongoose.connect(mongoURI);
  console.log('Connected to mongo!');
  app.use(
    session({
      resave: false,
      saveUninitialized: true,
      secret: 'something cryptic',
      store: new MongoStore({ mongoUrl: mongoURI, crypto: { secret: process.env.SESSION_SECRET } }),
    }),
  );
  await FroshServices.initFroshGroups(froshGroups);
};

module.exports = loadMongo;
