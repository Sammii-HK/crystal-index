'use strict';

const Hapi = require('@hapi/hapi');
const AuthBearer = require('hapi-auth-bearer-token');
const Routes = require('./controller');
const { verificationBus } = require('./lib/secureRoute.js')

const init = async () => {
  const server = Hapi.Server({
    host: `0.0.0.0`,
    port: 3000,
  });
  await server.register(AuthBearer)
  server.auth.strategy('authUser', 'bearer-access-token', { validate: verificationBus });

  server.route(Routes);
  await server.start();
  console.log('🦄 Server running at port:', server.info.uri);
};

init();
