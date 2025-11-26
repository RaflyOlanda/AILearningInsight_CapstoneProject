const { mockActivities } = require('../../utils/mockData');

module.exports = {
  getActivitiesByUser: (request, h) => {
    const { userId } = request.params;
    const activities = mockActivities.filter((a) => a.userId === userId);
    return h.response({ status: 'success', data: activities }).code(200);
  },
};
