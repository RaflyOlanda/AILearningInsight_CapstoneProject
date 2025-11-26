module.exports = {
  login: (request, h) => {
    const { email, password } = request.payload;
    if (email && password) {
      return h.response({
        status: 'success',
        message: 'Login successful (dummy)',
        token: 'mock-token-12345',
      }).code(200);
    }
    return h.response({ status: 'fail', message: 'Missing credentials' }).code(400);
  },
};
