/**
 * MIDDLEWARE IMPORT
**/
const express = require('express');
const path = require('path');
const logger = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const env = require("dotenv").config();

/**
 * MIDDLEWARE CONFIGURATION
**/
// Authentification
const passport = require('./config/passport');

// Database connection
const database = require('./config/database');


/**
 * ROUTE FILES
**/
const bootcampsApiRoutes = require('./routes/api/v1.0/bootcamps');
const ironhackersApiRoutes = require('./routes/api/v1.0/ironhackers');
const projectsApiRoutes = require('./routes/api/v1.0/projects');
const userAuth = require('./routes/user-auth');


/**
 * APP CONFIGURATION
**/
const app = express();

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
app.use('/api/v1.0/bootcamps', bootcampsApiRoutes);
app.use('/api/v1.0/ironhackers', ironhackersApiRoutes);
app.use('/api/v1.0/projects', projectsApiRoutes);


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
