const routes = (handler) => [
  {
    method: 'GET',
    path: '/users/me',
    handler: handler.me,
  },
  {
    method: 'GET',
    path: '/users/preferences',
    handler: handler.preferences,
  },
  {
    method: 'PATCH',
    path: '/users/preferences',
    handler: handler.updatePreferences,
  },
];

module.exports = routes;
