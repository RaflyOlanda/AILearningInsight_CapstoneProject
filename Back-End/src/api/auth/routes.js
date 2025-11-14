module.exports = (handler) => [
  { 
    method: 'POST', 
    path: '/auth/login', 
    handler: handler.login 
  },
];

