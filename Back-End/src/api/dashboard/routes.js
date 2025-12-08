const handler = require('./handler');

module.exports = [
  {
    method: 'GET',
    path: '/dashboard/last-course/{userId}',
    handler: handler.getLastCourseEnrolled,
    options: { auth: false }
  },
  {
    method: 'GET',
    path: '/dashboard/study-duration/{userId}',
    handler: handler.getAverageStudyDuration,
    options: { auth: false }
  },
  {
    method: 'GET',
    path: '/dashboard/learning-profile/{userId}',
    handler: handler.getLearningProfile,
    options: { auth: false }
  },
  {
    method: 'GET',
    path: '/dashboard/performance-chart/{userId}',
    handler: handler.getPerformanceChart,
    options: { auth: false }
  },
  {
    method: 'GET',
    path: '/dashboard/daily-checkpoint/{userId}',
    handler: handler.getDailyCheckpoint,
    options: { auth: false }
  },
  {
    method: 'GET',
    path: '/dashboard/learning-history/{userId}',
    handler: handler.getLearningHistory,
    options: { auth: false }
  },
  {
    method: 'GET',
    path: '/dashboard/leaderboard',
    handler: handler.getLeaderboard,
    options: { auth: false }
  },
  {
    method: 'GET',
    path: '/dashboard/leaderboard/me/{userId}',
    handler: handler.getCurrentUserRank,
    options: { auth: false }
  },
  {
    method: 'GET',
    path: '/dashboard/recommendations/{userId}',
    handler: handler.getRecommendations,
    options: { auth: false }
  }
];
