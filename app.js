/**
 * MIDDLEWARE IMPORT
**/
var express = require('express');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');
var cors = require('cors');
var env = require("dotenv").config();

/**
 * MIDDLEWARE CONFIGURATION
**/
// Authentification
var passport = require('./config/passport');

// Database connection
require('./config/database');


/**
 * ROUTE FILES
**/
var ironhackersApiRoutes = require('./routes/api/v1.0/ironhackers');
var projectssApiRoutes = require('./routes/api/v1.0/projects');
var userAuth = require('./routes/user-auth');


/**
 * APP CONFIGURATION
**/
var app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
//app.use(express.static(path.join(__dirname, 'public')));


/**
 * ROUTES
**/
app.use('/', userAuth);
// app.use('/api/v1.0/ironhackers', passport.authenticate('jwt', {session: false}), ironhackersApiRoutes);
// app.use('/api/v1.0/projects', passport.authenticate('jwt', {session: false}), projectssApiRoutes);
app.use('/api/v1.0/ironhackers', ironhackersApiRoutes);
app.use('/api/v1.0/projects', projectssApiRoutes);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // Return error message
  res.status(err.status || 500).json({ message: err.message });
});

module.exports = app;
