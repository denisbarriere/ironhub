'use strict';
/**
 * MIDDLEWARE IMPORT
**/
const mongoose = require('mongoose');


/**
 * MIDDLEWARE CONFIGURATION
**/
// connect to the database
mongoose.connect(process.env.MONGODB_URI);

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log(`Connected to the database`);
});
