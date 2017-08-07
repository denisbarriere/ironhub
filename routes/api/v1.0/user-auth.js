/**
 * MIDDLEWARE IMPORT
**/
const express = require('express');
const passport = require('../../../config/passport');
const jwt = require('jsonwebtoken');
const jwtOptions = require('../../../config/jwt');
const User = require('../../../models/user-model');
const bcrypt = require('bcrypt');



/**
 * MIDDLEWARE CONFIGURATION
**/
const router = express.Router();
const bcryptSalt = 10;


/**
 * ROUTES
**/
// SIGNUP
router.post('/signup', (req, res, next) => {
  let email = req.body.email;
  let password = req.body.password;

  if (!email || !password) {
    res.status(400).json({ message: 'Please provide both email and password' });
    return;
  }

  User.findOne({ email }, '_id email password role firstName', (err, foundUser) => {
    if (foundUser) {
      res.status(400).json({ message: 'This email already exists' });
      return;
    }

    let salt = bcrypt.genSaltSync(bcryptSalt);
    let hashPass = bcrypt.hashSync(password, salt);

    const theUser = new User({
      email,
      password: hashPass
    });

    theUser.save((err, user) => {
      if (err) {
        res.status(400).json({ message: err });
      }
      else {
        const payload = {id: user._id, user: user.email};
        const token = jwt.sign(payload, jwtOptions.secretOrKey);

        res.status(200).json({ token, user });
      }
    });
  });
});


// LOGIN
router.post('/login', (req, res, next) => {
  let email = req.body.email;
  let password = req.body.password;

  if (!email || !password) {
    res.status(401).json({ message: 'Please provide both email and password' });
    return;
  }

  User.findOne({'email': email}, '_id email password role firstName', (err, user) => {
    if (!user) {
      res.status(401).json({ message: 'The email or password is incorrect' });
      return;
    }

    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (!isMatch) {
        res.status(401).json({ message: 'The email or password is incorrect' });
      }
      else {
        const payload = {id: user._id, user: user.email};
        const token = jwt.sign(payload, jwtOptions.secretOrKey);

        res.status(200).json({ token, user });
      }
    });
  });
});

// TOKEN
router.get('/token', passport.authenticate('jwt', { session: false }), (req, res) => {

  // Get the user information relevant to the session
  User.findOne({'_id': req.user._id}, '_id email password role firstName', (err, user) => {
    if (!user) {
      res.status(401).json({ message: 'The email or password is incorrect' });
      return;
    }
    res.status(200).json({ user: user });
  });
});

module.exports = router;
