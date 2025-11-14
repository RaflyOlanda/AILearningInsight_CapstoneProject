module.exports = (handler) => [
  { 
    method: 'GET', 
    path: '/activities/{userId}', 
    handler: handler.getActivitiesByUser 
 },
];
