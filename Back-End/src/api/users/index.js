const routes = require('./routes');
const handler = require('./handler');

module.exports = {
  name: 'users',
  register: async (server) => {
    server.route(routes(handler));
  },
};
