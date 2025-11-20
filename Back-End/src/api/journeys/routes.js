const routes = (handler) => [
  { method: 'GET', path: '/journeys', handler: handler.list },
  { method: 'GET', path: '/journeys/{id}', handler: handler.detail },
];

module.exports = routes;
