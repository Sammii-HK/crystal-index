'use strict'

const Jwt = require('@hapi/jwt');
const { secret, tokenExpiry } = require('../config/environment');


// Greate funtion to verify a token
const verifyToken = (artifact, secret, options = {}) => {
  try {
    Jwt.token.verify(artifact, secret, options);
    return { isValid: true };
  }
  catch (err) {
    return {
      isValid: false,
      error: err.message
    };
  }
};

const isVerified = (decodedToken, secret) => verifyToken(decodedToken, secret)

const decodedToken = (token) => Jwt.token.decode(token);

// // Get response of a succesful verification
// const validResponse = verifyToken(decodedToken, secret);

// // Get response of a unsuccessful verification due to wrong shared secret
// const badSecretResponse = verifyToken(decodedToken, 'some_unshared_secret');

// // Get response of a unsuccessful verification due to wrong iss
// const badIssResonse = verifyToken(decodedToken, secret, { iss: 'urn:issuer:different_test' });

// module.exports = { verifyToken, validResponse, badSecretResponse, badIssResonse}
module.exports = { verifyToken, isVerified, decodedToken }