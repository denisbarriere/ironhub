/**
 * MIDDLEWARE IMPORT
**/
const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

/**
 * MIDDLEWARE CONFIGURATION
**/
// Authentification
const passport = require('./config/passport');

// Database connection
require('./config/database');


/**
 * ROUTE FILES
**/
const userAuth = require('./routes/api/v1/user-auth');
const bootcampsApiRoutes = require('./routes/api/v1/bootcamps');
const ironhackersApiRoutes = require('./routes/api/v1/ironhackers');
const projectsApiRoutes = require('./routes/api/v1/projects');
const uploadApiRoutes = require('./routes/api/v1/uploads');


/**
 * APP CONFIGURATION
**/
const app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Enable communication between the express API and the Angular 2 front-end
app.use(cors());


/**
 * ROUTES
**/
app.use('/api/v1/', userAuth);
app.use('/api/v1/', passport.authenticate('jwt', {session: false}), bootcampsApiRoutes);
app.use('/api/v1/', passport.authenticate('jwt', {session: false}), ironhackersApiRoutes);
app.use('/api/v1/', passport.authenticate('jwt', {session: false}), projectsApiRoutes);
app.use('/api/v1/', passport.authenticate('jwt', {session: false}), uploadApiRoutes);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  let err = new Error('Not Found');
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
