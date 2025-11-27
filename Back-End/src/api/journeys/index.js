const JourneysHandler = require('./handler');
const routes = require('./routes');

module.exports = {
  name: 'journeys',
  register: async (server) => {
    const handler = new JourneysHandler();
    server.route(routes(handler));
  },
};
