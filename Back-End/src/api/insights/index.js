const InsightsHandler = require('./handler');
const routes = require('./routes');

module.exports = {
  name: 'insights',
  register: async (server) => {
    const handler = new InsightsHandler();
    server.route(routes(handler));
  },
};
