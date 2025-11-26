const { mockUsers } = require('../../utils/mockData');

module.exports = {
  getUserById: (request, h) => {
    const { id } = request.params;
    const user = mockUsers.find((u) => u.id === id);
    if (!user) return h.response({ status: 'fail', message: 'User not found' }).code(404);
    return h.response({ status: 'success', data: user }).code(200);
  },
};
