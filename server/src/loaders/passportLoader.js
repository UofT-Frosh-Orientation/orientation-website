const passport = require('../services/passport');

const passportLoader = (app) => {
  app.use(passport.initialize());
  app.use(passport.session());
};

module.exports = passportLoader;
