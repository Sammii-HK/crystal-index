'use strict';

const Hapi = require('@hapi/hapi');
const Routes = require('./controller');
const { verificationBus } = require('./lib/secureRoute.js')

const init = async () => {
  const server = Hapi.Server({
    host: `0.0.0.0`,
    port: 3000,
  });
  await server.register(require('@hapi/basic'));
  server.auth.strategy('authUser', 'basic', { validate: verificationBus });

  server.route(Routes);
  await server.start();
  console.log('🦄 Server running at port:', server.info.uri);
};

init();
