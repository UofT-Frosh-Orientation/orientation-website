const bcrypt = require('bcrypt');
const passport = require('passport');
const User = require('../models/UserModel');
const LocalStrategy = require('passport-local').Strategy;

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then(
    (user) => {
      if (!user) {
        return done(new Error('USER_NOT_FOUND'));
      }
      done(null, user);
    },
    (error) => done(new Error('UNABLE_TO_DESERIALIZE_USER', { cause: error })),
  );
});

passport.use(
  new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
    User.findOne({ email: email.toLowerCase() })
      .then((user) => {
        if (!user) {
          return done(new Error('USER_NOT_FOUND'));
        }
        bcrypt.compare(password, user.hashedPassword, (error, isMatch) => {
          if (error) {
            throw done(new Error('UNABLE_TO_VERIFY_PASSWORD', { cause: error }));
          }
          if (isMatch) {
            return done(null, user);
          } else {
            return done(null, false, { message: 'WRONG_PASSWORD' });
          }
        });
      })
      .catch((error) => done(new Error('UNABLE_TO_FIND_USER', { cause: error })));
  }),
);

module.exports = passport;
