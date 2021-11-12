'use strict'

const Jwt = require('@hapi/jwt');
const db = require('../models');
const { secret } = require('../config/environment.js');

// Greate funtion to verify a token
const verifyToken = (artifact, secret, options = {}) => {
  try {
    const sub = artifact.decoded.payload.sub
    Jwt.token.verify(artifact, secret, options);
    return { 
      isValid: true,
      sub,
    };
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


const verificationBus = async (req) => {
  const token = req.headers.token;
  console.log("🔒 token", token);

  let isValid = null;
  let credentials = null;

  if (token) {
    const decoded = decodedToken(token)
    const verify = isVerified(decoded, secret)
    console.log("🔦 verify", verify);
    
    const { id } = req.params;
    const isCurrentUser = id == verify.sub
    console.log("🧙‍♀️ isCurrentUser", isCurrentUser);

    isValid = verify.isValid; 
  
    credentials = {
      token,
      ...verify,
      isCurrentUser,
      id,
    }
  
    if (verify.isValid) {
      const results = await db.user.findOne({ where: { id } });
      credentials = {
        ...credentials,
        welcome: `Hey ${results.username}!`,
        // user: results,
      };
    }
  }
  console.log("credentials", credentials);
  
  return { isValid, credentials }
  
}

module.exports = { verificationBus };