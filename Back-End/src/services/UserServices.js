const pool = require('./Pool');

class UsersService {
  async getUserByEmail(email) {
    const result = await pool.query(
      'SELECT * FROM users WHERE email = $1 LIMIT 1',
      [email]
    );
    return result.rows[0];
  }

  async getUserById(id) {
    const result = await pool.query(
      'SELECT * FROM users WHERE user_id = $1',
      [id]
    );
    return result.rows[0];
  }
}

module.exports = UsersService;
