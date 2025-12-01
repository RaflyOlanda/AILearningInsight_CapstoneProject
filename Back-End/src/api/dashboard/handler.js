const pool = require('../../services/Pool');

module.exports = {
  getLastCourseEnrolled: async (request, h) => {
    try {
      const { userId } = request.params;
      const query = `
        SELECT 
          dj.journey_id,
          dj.journey_name as course_name,
          dj.hours_to_study,
          djc.study_duration,
          djc.last_enrolled_at,
          CASE 
            WHEN dj.hours_to_study > 0 THEN ROUND((djc.study_duration::numeric / dj.hours_to_study) * 100, 2)
            ELSE 0
          END as progress,
          djc.avg_submission_ratings
        FROM developer_journey_completion djc
        JOIN developer_journeys dj ON dj.journey_id = djc.journey_id
        WHERE djc.user_id = $1
        ORDER BY djc.last_enrolled_at DESC
        LIMIT 1;
      `;
      const result = await pool.query(query, [userId]);
      
      if (result.rows.length === 0) {
        return h.response({ 
          status: 'fail', 
          message: 'Tidak ada course yang diambil' 
        }).code(404);
      }

      return h.response({ 
        status: 'success', 
        data: result.rows[0] 
      }).code(200);
    } catch (error) {
      return h.response({ 
        status: 'fail', 
        message: error.message 
      }).code(500);
    }
  },

  getAverageStudyDuration: async (request, h) => {
    try {
      const { userId } = request.params;
      const query = `
        SELECT 
          SUM(djc.study_duration) as total_hours,
          ROUND(AVG(djc.study_duration), 2) as avg_per_course,
          COUNT(djc.journey_id) as total_courses,
          u.total_study_duration,
          ROUND((SUM(djc.study_duration)::numeric / 200) * 100, 2) as achievement_percent
        FROM developer_journey_completion djc
        JOIN users u ON u.user_id = djc.user_id
        WHERE djc.user_id = $1
        GROUP BY u.user_id;
      `;
      const result = await pool.query(query, [userId]);

      if (result.rows.length === 0) {
        return h.response({ 
          status: 'fail', 
          message: 'User tidak ditemukan' 
        }).code(404);
      }

      return h.response({ 
        status: 'success', 
        data: result.rows[0] 
      }).code(200);
    } catch (error) {
      return h.response({ 
        status: 'fail', 
        message: error.message 
      }).code(500);
    }
  },

  getLearningProfile: async (request, h) => {
    try {
      const { userId } = request.params;
      const query = `
        SELECT 
          u.user_id,
          u.display_name,
          u.learner_type,
          u.mean_point,
          u.n_kelas_fast,
          u.normal,
          u.slow,
          u.total_exp,
          COUNT(djc.journey_id) as total_courses
        FROM users u
        LEFT JOIN developer_journey_completion djc ON u.user_id = djc.user_id
        WHERE u.user_id = $1
        GROUP BY u.user_id;
      `;
      const result = await pool.query(query, [userId]);

      if (result.rows.length === 0) {
        return h.response({ 
          status: 'fail', 
          message: 'User tidak ditemukan' 
        }).code(404);
      }

      const user = result.rows[0];
      const learnerTypes = {
        'Fast': {
          type: 'Fast Learner',
          description: 'Kamu adalah tipe learner yang cepat menangkap konsep baru.',
          strengths: ['Pemahaman Cepat', 'Problem Solving', 'Adaptasi Tinggi'],
          weaknesses: ['Kurang Detail', 'Terburu-buru']
        },
        'Normal': {
          type: 'Balanced Learner',
          description: 'Kamu memiliki keseimbangan baik dalam belajar dan praktik.',
          strengths: ['Konsistensi', 'Fleksibilitas'],
          weaknesses: ['Kurang Fokus']
        },
        'Slow': {
          type: 'Reflective Learner',
          description: 'Kamu adalah tipe learner yang reflektif dan cermat.',
          strengths: ['Detail Oriented', 'Pemahaman Mendalam'],
          weaknesses: ['Lambat', 'Kurang Spontan']
        }
      };

      const profile = learnerTypes[user.learner_type] || learnerTypes['Normal'];

      const fast = Number(user.n_kelas_fast) || 0;
      const normal = Number(user.normal) || 0;
      const slow = Number(user.slow) || 0;
      const totalCat = fast + normal + slow;
      const toPercent = (n) => (totalCat > 0 ? Math.round((n / totalCat) * 100) : 0);
      const distribution = {
        fast: toPercent(fast),
        normal: toPercent(normal),
        slow: toPercent(slow),
      };

      return h.response({ 
        status: 'success', 
        data: {
          user_id: user.user_id,
          display_name: user.display_name,
          learner_type: profile.type,
          description: profile.description,
          strengths: profile.strengths,
          weaknesses: profile.weaknesses,
          mean_point: user.mean_point,
          total_courses: user.total_courses,
          xp: user.total_exp,
          distribution
        } 
      }).code(200);
    } catch (error) {
      return h.response({ 
        status: 'fail', 
        message: error.message 
      }).code(500);
    }
  },

  getPerformanceChart: async (request, h) => {
    try {
      const { userId } = request.params;
      const query = `
        SELECT 
          uis.last_enrolled_at,
          uis.study_duration,
          uis.hours_to_study,
          uis.persentase_kecepatan,
          uis.point,
          uis.keterangan,
          dj.journey_name
        FROM user_insight_summary uis
        JOIN developer_journeys dj ON dj.journey_id = uis.journey_id
        WHERE uis.user_id = $1
        ORDER BY uis.last_enrolled_at DESC NULLS LAST
        LIMIT 5;
      `;
      const result = await pool.query(query, [userId]);

      if (result.rows.length === 0) {
        return h.response({
          status: 'success',
          data: {
            labels: [],
            series: [
              { name: 'Score', data: [] },
              { name: 'Study Duration', data: [] }
            ],
            description: 'Belum ada data insight.'
          }
        }).code(200);
      }

      const labels = result.rows.map(r => r.journey_name);
      const hoursData = result.rows.map(r => Math.max(0, Number(r.hours_to_study) || 0));
      const durationData = result.rows.map(r => Math.max(0, Number(r.study_duration) || 0));
      const latestDescription = result.rows[0].keterangan || 'Tidak ada keterangan.';

      const chartData = {
        labels: labels.reverse(), // reverse agar yang paling lama di kiri
        series: [
          { name: 'Hours', data: hoursData.reverse() },
          { name: 'Study Duration', data: durationData.reverse() }
        ],
        description: latestDescription
      };

      return h.response({ 
        status: 'success', 
        data: chartData 
      }).code(200);
    } catch (error) {
      return h.response({ 
        status: 'fail', 
        message: error.message 
      }).code(500);
    }
  },

  getLearningHistory: async (request, h) => {
    try {
      const { userId } = request.params;
      const query = `
        SELECT 
          dj.journey_id,
          dj.journey_name as course_title,
          djc.enrollments_at as date,
          djc.avg_submission_ratings as score,
          djc.study_duration as duration,
          djc.enrolling_times
        FROM developer_journey_completion djc
        JOIN developer_journeys dj ON dj.journey_id = djc.journey_id
        WHERE djc.user_id = $1
        ORDER BY djc.enrollments_at DESC;
      `;
      const result = await pool.query(query, [userId]);

      return h.response({ 
        status: 'success', 
        data: result.rows 
      }).code(200);
    } catch (error) {
      return h.response({ 
        status: 'fail', 
        message: error.message 
      }).code(500);
    }
  },

  getLeaderboard: async (request, h) => {
    try {
      const query = `
        SELECT 
          ROW_NUMBER() OVER (ORDER BY u.total_exp DESC) as rank,
          u.user_id,
          u.display_name as name,
          u.total_exp as xp,
          ROUND(u.total_exp / 100) as level
        FROM users u
        WHERE u.total_exp IS NOT NULL
        ORDER BY u.total_exp DESC
        LIMIT 10;
      `;
      const result = await pool.query(query);

      return h.response({ 
        status: 'success', 
        data: result.rows 
      }).code(200);
    } catch (error) {
      return h.response({ 
        status: 'fail', 
        message: error.message 
      }).code(500);
    }
  },

  getDailyCheckpoint: async (request, h) => {
    try {
      const { userId } = request.params;
      const query = `
        SELECT 
          DATE(enrollments_at) as date,
          COUNT(*) as activities,
          SUM(study_duration) as total_duration
        FROM developer_journey_completion
        WHERE user_id = $1 AND enrollments_at IS NOT NULL
        GROUP BY DATE(enrollments_at)
        ORDER BY DATE(enrollments_at) DESC
        LIMIT 30;
      `;
      const result = await pool.query(query, [userId]);

      return h.response({ 
        status: 'success', 
        data: result.rows 
      }).code(200);
    } catch (error) {
      return h.response({ 
        status: 'fail', 
        message: error.message 
      }).code(500);
    }
  },

  getRecommendations: async (request, h) => {
    try {
      const { userId } = request.params;
      
      const query = `
        SELECT 
          dj.journey_id,
          dj.journey_name,
          dj.difficulty,
          dj.hours_to_study,
          dj.xp,
          COUNT(djc.journey_id) as enrolled_count
        FROM developer_journeys dj
        LEFT JOIN developer_journey_completion djc 
          ON dj.journey_id = djc.journey_id AND djc.user_id = $1
        WHERE djc.journey_id IS NULL
        GROUP BY dj.journey_id
        ORDER BY dj.xp DESC
        LIMIT 5;
      `;
      const result = await pool.query(query, [userId]);

      const recommendations = result.rows.map(row => ({
        journey_id: row.journey_id,
        title: row.journey_name,
        reason: `Sesuai dengan skill level kamu - ${row.difficulty === 1 ? 'Beginner' : row.difficulty === 2 ? 'Intermediate' : 'Advanced'}`,
        difficulty: row.difficulty,
        estimated_time: `${row.hours_to_study} hours`,
        xp_reward: row.xp
      }));

      return h.response({ 
        status: 'success', 
        data: recommendations 
      }).code(200);
    } catch (error) {
      return h.response({ 
        status: 'fail', 
        message: error.message 
      }).code(500);
    }
  }
};
