const axios = require('axios');
const { mockInsights } = require('../../utils/mockData');

module.exports = {
  getInsightByUser: (request, h) => {
    const { userId } = request.params;
    const insight = mockInsights[userId];
    if (!insight) return h.response({ status: 'fail', message: 'Insight not found' }).code(404);
    return h.response({ status: 'success', data: insight }).code(200);
  },

  predictInsight: async (request, h) => {
    const { activities } = request.payload;
    // simulasi panggil model AI nanti
    const categories = ['Fast Learner', 'Reflective Learner', 'Consistent Learner'];
    const random = categories[Math.floor(Math.random() * categories.length)];
    const confidence = (Math.random() * 0.5 + 0.5).toFixed(2);

    return h.response({
      status: 'success',
      data: { predictedCategory: random, confidence },
    }).code(200);
  },
};
