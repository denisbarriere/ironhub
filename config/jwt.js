/**
 * MIDDLEWARE IMPORT
**/
const passportJwt = require('passport-jwt');
require("dotenv").config();

/**
 * MIDDLEWARE CONFIGURATION
**/
const ExtractJwt  = passportJwt.ExtractJwt;
let jwtOptions = {};

jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeader();
jwtOptions.secretOrKey = process.env.JWT_SECRETORKEY;

module.exports = jwtOptions;
