module.exports = (handler) => [
  { 
    method: 'GET', 
    path: '/insights/{userId}', 
    handler: handler.getInsightByUser 
  },
  { 
    method: 'POST', 
    path: '/predict', 
    handler: handler.predictInsight 
  },
];
