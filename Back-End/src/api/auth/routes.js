const routes = (handler) => [
  {
    method: 'POST',
    path: '/auth/login',
    handler: handler.login,
    options: { auth: false }
  },
];

module.exports = routes;
