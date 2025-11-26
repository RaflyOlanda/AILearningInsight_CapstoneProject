module.exports = (handler) => [
  { 
    method: 'GET', 
    path: '/users/{id}', 
    handler: handler.getUserById 
  },
];