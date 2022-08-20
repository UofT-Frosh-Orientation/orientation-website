const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo');

const FroshServices = require('../services/FroshServices');
const FroshModel = require('../models/FroshModel');

const froshGroups = [
  {
    name: 'Alpha',
    icon: 'α',
  },
  {
    name: 'Beta',
    icon: 'β',
  },
  {
    name: 'Iota',
    icon: 'ι',
  },
  {
    name: 'Phi',
    icon: 'φ',
  },
  {
    name: 'Psi',
    icon: 'ψ',
  },
  {
    name: 'Rho',
    icon: 'ρ',
  },
  {
    name: 'Zeta',
    icon: 'ζ',
  },
  {
    name: 'Gamma',
    icon: 'γ',
  },
  {
    name: 'Omega',
    icon: 'ω',
  },
  {
    name: 'Chi',
    icon: 'χ',
  },
  {
    name: 'Upsilon',
    icon: 'υ',
  },
  {
    name: 'Pi',
    icon: 'π',
  },
  {
    name: 'Nu',
    icon: 'ν',
  },
  {
    name: 'Delta',
    icon: 'δ',
  },
  {
    name: 'Sigma',
    icon: 'σ',
  },
  {
    name: 'Tau',
    icon: 'τ',
  },
  {
    name: 'Kappa',
    icon: 'κ',
  },
  {
    name: 'Theta',
    icon: 'θ',
  },
  {
    name: 'Lambda',
    icon: 'λ',
  },
  {
    name: 'Omicron',
    icon: 'ο',
  },
];

const loadMongo = async (app) => {
  console.log('Loading mongo...');
  const { MONGODB_PASSWORD, MONGODB_HOST, MONGODB_USER } = process.env;
  const mongoURI = `mongodb://${MONGODB_USER}:${MONGODB_PASSWORD}@${
    process.env.NODE_ENV === 'production' ? MONGODB_HOST : 'mongo-dev'
  }:27017/orientation?authSource=admin`;
  await mongoose.connect(mongoURI);
  // mongoose.set('debug', true); // uncomment this if you have issues with mongo and want to debug
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
  await FroshModel.updateMany({}, { authScopes: { requested: [], approved: [] } });
};

module.exports = loadMongo;
