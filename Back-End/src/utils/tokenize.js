const Jwt = require('@hapi/jwt');

function generateToken(payload) {
  return Jwt.token.generate(payload, process.env.ACCESS_TOKEN_KEY);
}

module.exports = { generateToken };
