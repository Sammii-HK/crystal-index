'use strict'

const db = require('../models');
const bcrypt = require('bcrypt');
const Jwt = require('@hapi/jwt');
const { secret, tokenExpiry } = require('../config/environment.js');
const Boom = require('boom');
const { verificationBus } = require('../lib/secureRoute.js')

module.exports = [
  // Register user
  {
    method: 'POST',
    path: '/register',
    options: {
      auth: false,
    },
    handler: async (req, h) => {
      const {
        username, email, password, firstName, lastName, mobileNum, address,
      } = req.payload;
      try {    
        let message
        await db.user.findOne({ 
          where: { username } })
        .then(async (user) => {
          // only create a user if none are found with matching credentials
          if(!user) {
            const results = await db.user.create({
              username, 
              email, 
              password: await bcrypt.hash(password, 10),
              userDetail: {
                firstName, 
                lastName,
                mobileNum,
                address,
              }
            }, {
              include: [
                {
                  model: db.userDetail,
                  as: 'userDetail',
                },
              ],
            });
            message = {
              success: true,
              results: {
                id: results.id,
                username: results.username,
              },
            };
          } else {
            message = Boom.methodNotAllowed(`Failed: user already exists!`)
          }
        })
        return message
        
      } catch (h) {
        console.log('error creating user:', h);
        return Boom.badImplementation(`Failed: ${h.message}`)
      }
    },
  }, 
  // Login user
  {
    method: 'POST',
    path: '/login',
    options: {
      auth: false,
    },
    handler: async (req, h) => {
      const {
        username, password,
      } = req.payload;
      try {
        let message
        await db.user.findOne({ where: { username } })
        .then(async user => {
          const isPasswordValid = await bcrypt.compare(password, user.password)
          // check their password is valid
          console.log("🔮 isPasswordValid", isPasswordValid); 
          if(!isPasswordValid) {
            console.log("🥊 DENIED");
            message = Boom.unauthorized('The username and/or password to not match our system.');
          } else if (isPasswordValid) {
            // create a token
            const token = Jwt.token.generate(
              { sub: user.id }, { key: secret }, { ttlSec: tokenExpiry }
            );
            // send it to the client
            message = {
              success: true,
              id: user.id,
              message: `Welcome back, ${user.username}!`,
              credentials: token,
            };
          }
        })       
        return message

      } catch (h) {
        console.log('error finding user:', h);
        return Boom.badImplementation(`Failed: ${h.message}`)
      }
    },
  }, 
  // Get user Info
  {
    method: 'GET',
    path: '/profile/{id}',
    handler: async (req, h) => {
      try {
        const verify = await verificationBus(req)
        const { id } = req.params;

        let results = null

        if (verify.isValid) {
          results = await db.user.findOne({
            where: { id },
          }, {
            include: [
              {
                model: db.userDetail,
                as: 'userDetail',
              },
            ],
          });
        } // else return Boom.unauthorized('Access Denied')

        return { verify, results }

      } catch (e) {
        console.log('error finding user:', e);
        return h.response(`Failed: ${e.message}`).code(500);
      }
    },
  }, 
  // Update user Info
  {
    method: 'PUT',
    path: '/profile/{id}',
    handler: async (req, h) => {
      const { id } = req.params;
      const {
        username, password,
      } = req.payload;

      const updateUsersObject = {
        username,
        password, 
      };

      try {
        const verify = await verificationBus(req)

        if (verify.isValid && verify.isCurrentUser) {
        // if (verify.isValid && isCurrentUser) {
          const updatePromises = [];
          const updateUsersPromise = db.user.update(
            updateUsersObject,
            { where: { id } },
          );
          updatePromises.push(updateUsersPromise);
  
          await Promise.all(updatePromises);
  
          const results = await db.user.findOne({
            where: { id },
          }, {
            include: [
              {
                model: db.userDetail,
                as: 'userDetail',
              },
            ],
          });
  
          return { verify, results }

        } else return Boom.unauthorized('Access Denied')

      } catch (e) {
        console.log('error updating user:', e);
        return h.response(`Failed: ${e.message}`).code(500);
      }
    },
  }, 
  {
    method: 'DELETE',
    path: '/goodbye/{id}',
    handler: async (req, h) => {
      try {
        const { id } = req.params;
        const results = await db.user.destroy({
          where: {
            id: id,
          },
        });
        return results;
      } catch (e) {
        console.log('error deleting user:', e);
        return h.response(`Failed: ${e.message}`).code(500);
      }
    },
  }
];