require('dotenv').config();
const Hapi = require('@hapi/hapi');
const Jwt = require('@hapi/jwt');
const Inert = require('@hapi/inert');
const Path = require('path');
const Fs = require('fs');

const auth = require('./api/auth');
const users = require('./api/users');
const journeys = require('./api/journeys');
const insights = require('./api/insights');
const dashboard = require('./api/dashboard');

const init = async () => {
  const server = Hapi.server({
    port: parseInt(process.env.PORT, 10) || 5000,
    host: process.env.HOST || 'localhost',
    routes: { cors: true }
  });

  await server.register(Jwt);

  server.auth.strategy('jwt', 'jwt', {
    keys: process.env.ACCESS_TOKEN_KEY || 'default-secret-key-change-this',
    verify: {
      aud: false,
      iss: false,
      sub: false,
      maxAgeSec: parseInt(process.env.TOKEN_AGE) || 14400,
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

  
  const distPath = Path.resolve(__dirname, '../../Front-End/dist');
  if (Fs.existsSync(distPath)) {
    await server.register(Inert);
    
    server.route({
      method: 'GET',
      path: '/assets/{param*}',
      options: { auth: false },
      handler: {
        directory: {
          path: Path.join(distPath, 'assets'),
          listing: false,
        },
      },
    });
    
    server.route({
      method: 'GET',
      path: '/{param*}',
      options: { auth: false },
      handler: (request, h) => {
        const p = request.path || '';
        if (p.startsWith('/dashboard') || p.startsWith('/auth') || p.startsWith('/users') || p.startsWith('/journeys') || p.startsWith('/insights')) {
          return h.response().code(404);
        }
        return h.file(Path.join(distPath, 'index.html'));
      },
    });
  }

  await server.start();
  console.log(`Server running at ${server.info.uri}`);
};

init();
