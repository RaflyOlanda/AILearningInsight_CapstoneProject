const AuthHandler = require('./handler');
const routes = require('./routes');

module.exports = {
  name: 'auth',
  register: async (server) => {
    const handler = new AuthHandler();
    server.route(routes(handler));
  }
};
