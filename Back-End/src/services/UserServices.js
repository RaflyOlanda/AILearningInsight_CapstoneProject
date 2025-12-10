const pool = require('./Pool');

class UsersService {
  constructor() {
    this._ensurePreferencesPromise = this._ensurePreferenceColumns();
  }

  async _ensurePreferenceColumns() {
    try {
      await pool.query('ALTER TABLE IF EXISTS public.users ADD COLUMN IF NOT EXISTS theme_preference VARCHAR(50)');
      await pool.query('ALTER TABLE IF EXISTS public.users ADD COLUMN IF NOT EXISTS badge_preference VARCHAR(50)');
    } catch (err) {
      console.error('Failed to ensure user preference columns:', err.message);
      throw err;
    }
  }

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

  async getPreferencesByUserId(id) {
    await this._ensurePreferencesPromise;
    const result = await pool.query(
      'SELECT theme_preference, badge_preference FROM public.users WHERE user_id = $1',
      [id]
    );
    const row = result.rows[0] || {};
    return {
      theme: row.theme_preference ?? null,
      badge: row.badge_preference ?? null,
    };
  }

  async updatePreferences(userId, { theme, badge }) {
    await this._ensurePreferencesPromise;

    const updates = [];
    const values = [userId];
    let placeholder = 2;

    if (typeof theme !== 'undefined') {
      updates.push(`theme_preference = $${placeholder}`);
      values.push(theme);
      placeholder += 1;
    }

    if (typeof badge !== 'undefined') {
      updates.push(`badge_preference = $${placeholder}`);
      values.push(badge);
      placeholder += 1;
    }

    if (updates.length === 0) {
      return this.getPreferencesByUserId(userId);
    }

    const query = `UPDATE public.users SET ${updates.join(', ')} WHERE user_id = $1 RETURNING theme_preference, badge_preference`;
    const result = await pool.query(query, values);

    if (result.rowCount === 0) {
      return this.getPreferencesByUserId(userId);
    }

    const row = result.rows[0] || {};
    return {
      theme: row.theme_preference ?? null,
      badge: row.badge_preference ?? null,
    };
  }
}

module.exports = UsersService;
