/**
 * MIDDLEWARE IMPORT
**/
const passport = require('passport');
const passportJwt = require('passport-jwt');
const jwtOptions = require('./jwt');
const User = require('../models/user-model');


/**
 * MIDDLEWARE CONFIGURATION
**/
const JwtStrategy = passportJwt.Strategy;

let strategy = new JwtStrategy(jwtOptions, (payload, done) => {
  User.findById(payload.id, (err, user) => {
    if (err) {
      return done(err, false);
    }
    user ? done(null, user) : done(null, false);
  });
});

passport.use(strategy);

module.exports = passport;
