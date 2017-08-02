/**
 * MIDDLEWARE IMPORT
**/
const passportJwt = require('passport-jwt');


/**
 * MIDDLEWARE CONFIGURATION
**/
const ExtractJwt  = passportJwt.ExtractJwt;
let jwtOptions = {};

jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeader();
jwtOptions.secretOrKey = process.env.JWT_SECRETORKEY;

module.exports = jwtOptions;
