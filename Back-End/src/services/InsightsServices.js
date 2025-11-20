const pool = require('./Pool');

class InsightsService {
  async getUserStudyHistory(userId) {
    const query = `
      SELECT 
        dj.journey_name,
        djc.study_duration,
        djc.avg_submission_ratings,
        djc.enrollments_at
      FROM developer_journey_completion djc
      JOIN developer_journeys dj ON dj.journey_id = djc.journey_id
      WHERE djc.user_id = $1
      ORDER BY djc.enrollments_at ASC;
    `;
    const result = await pool.query(query, [userId]);
    return result.rows;
  }
}

module.exports = InsightsService;
