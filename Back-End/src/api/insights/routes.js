const routes = (handler) => [
  {
    method: 'GET',
    path: '/insights/me',
    handler: handler.myInsights,
  },
];

module.exports = routes;
