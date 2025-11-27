const routes = (handler) => [
  {
    method: 'GET',
    path: '/users/me',
    handler: handler.me,
  },
];

module.exports = routes;
