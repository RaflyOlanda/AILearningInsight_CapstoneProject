require('dotenv').config();
const Hapi = require('@hapi/hapi');
const Jwt = require('@hapi/jwt');

// APIs
const auth = require('./api/auth');
const users = require('./api/users');
const journeys = require('./api/journeys');
const insights = require('./api/insights');
const dashboard = require('./api/dashboard');

const init = async () => {
  const server = Hapi.server({
    port: 5000,
    host: 'localhost',
    routes: { cors: true }
  });

  await server.register(Jwt);

  server.auth.strategy('jwt', 'jwt', {
    keys: process.env.ACCESS_TOKEN_KEY,
    verify: {
      aud: false,
      iss: false,
      sub: false,
      maxAgeSec: process.env.TOKEN_AGE,
    },
    validate: (artifacts) => ({
      isValid: true,
      credentials: {
        id: artifacts.decoded.payload.id,
      },
    }),
  });

  server.auth.default('jwt');

  await server.register([
    auth,
    users,
    journeys,
    insights,
    dashboard,
  ]);

  await server.start();
  console.log(`Server running at ${server.info.uri}`);
};

init();
