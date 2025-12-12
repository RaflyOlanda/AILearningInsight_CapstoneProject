const { Pool } = require('pg');

function createPoolConfig() {
  if (process.env.DATABASE_URL) {
    return {
      connectionString: process.env.DATABASE_URL,
      ssl: process.env.PGSSLMODE === 'disable'
        ? false
        : { rejectUnauthorized: false },  // Railway butuh ini
    };
  }
}

const pool = new Pool(createPoolConfig());

module.exports = pool;

