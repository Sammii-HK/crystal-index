'use strict';

const Hapi = require('@hapi/hapi');
const Routes = require('./controller');

const init = async () => {
  const server = Hapi.Server({
    host: `0.0.0.0`,
    port: 3000,
  });
  server.route(Routes);
  await server.start();
  console.log('🦄 Server running at port:', server.info.uri);
};

init();
