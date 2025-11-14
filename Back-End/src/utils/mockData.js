const mockUsers = [
  { id: 'u1', name: 'Demosa Guardy', email: 'demosa@example.com' },
  { id: 'u2', name: 'Rafly Pratama', email: 'rafly@example.com' },
];

const mockActivities = [
  { userId: 'u1', topic: 'Data Structure', duration: 45, score: 80 },
  { userId: 'u1', topic: 'Algorithm', duration: 30, score: 75 },
];

const mockInsights = {
  u1: {
    category: 'Consistent Learner',
    insight: 'Kamu belajar dengan ritme stabil dan waktu tetap.',
    recommendedTopics: ['Optimization', 'Dynamic Programming'],
  },
};

module.exports = { mockUsers, mockActivities, mockInsights };
