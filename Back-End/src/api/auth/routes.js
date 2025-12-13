const routes = (handler) => [
  {
    method: 'POST',
    path: '/auth/login',
    handler: handler.login,
    options: { auth: false }
  },
  {
    method: 'POST',
    path: '/user/preferences',
    handler: handler.updatePreferences,
    options: { auth: 'jwt' }
  },
  {
    method: 'POST',
    path: '/auth/logout',
    handler: handler.logout,
    options: { auth: 'jwt' }
  },
];

module.exports = routes;
