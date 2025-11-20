const UsersHandler = require('./handler');
const routes = require('./routes');

module.exports = {
  name: 'users',
  register: async (server) => {
    const handler = new UsersHandler();
    server.route(routes(handler));
  },
};
