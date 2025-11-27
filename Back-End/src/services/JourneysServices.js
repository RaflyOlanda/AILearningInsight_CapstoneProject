const pool = require('./Pool');

class JourneysService {
  async getAll() {
    const result = await pool.query(
      'SELECT * FROM developer_journeys ORDER BY journey_id'
    );
    return result.rows;
  }

  async getById(id) {
    const result = await pool.query(
      'SELECT * FROM developer_journeys WHERE journey_id = $1',
      [id]
    );
    return result.rows[0];
  }
}

module.exports = JourneysService;
