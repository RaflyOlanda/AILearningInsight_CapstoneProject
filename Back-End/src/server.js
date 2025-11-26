require('dotenv').config();
const Hapi = require('@hapi/hapi');

const users = require('./api/users');
const insights = require('./api/insights');
const activities = require('./api/activities');
const auth = require('./api/auth');

const init = async () => {
  const server = Hapi.server({
    port: process.env.PORT || 5000,
    host: 'localhost',
    routes: {
      cors: { origin: ['*'] },
    },
  });

  await server.register([
    { plugin: users },
    { plugin: insights },
    { plugin: activities },
    { plugin: auth },
  ]);

  server.route({
    method: 'GET',
    path: '/health',
    handler: () => ({ status: 'ok', message: 'AI Learning Insight API is running' }),
  });

  await server.start();
  console.log(`🚀 Server running on ${server.info.uri}`);
};

process.on('unhandledRejection', (err) => {
  console.error(err);
  process.exit(1);
});

init();
