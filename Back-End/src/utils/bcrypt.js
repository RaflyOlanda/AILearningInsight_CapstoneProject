const bcrypt = require('bcrypt');

async function compare(password, hash) {
  return bcrypt.compare(password, hash);
}

module.exports = { compare };
