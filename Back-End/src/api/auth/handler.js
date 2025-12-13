const UsersService = require('../../services/UserServices');
const { generateToken } = require('../../utils/tokenize');

class AuthHandler {
  constructor() {
    this._service = new UsersService();
    this.login = this.login.bind(this);
    this.updatePreferences = this.updatePreferences.bind(this);
    this.logout = this.logout.bind(this);
  }

  async login(request, h) {
    const { email, password } = request.payload;

    const user = await this._service.getUserByEmail(email);
    if (!user) {
      return h.response({ status: 'fail', message: 'Email tidak ditemukan' }).code(404);
    }

    const isValid = String(password) === String(user.password);
    if (!isValid) {
      return h.response({ status: 'fail', message: 'Password salah' }).code(401);
    }

    const token = generateToken({ id: user.user_id });
    const preferences = await this._service.getPreferencesByUserId(user.user_id);

    return {
      status: 'success',
      message: 'Login berhasil',
      data: {
        token,
        user: {
          id: user.user_id,
          user_id: user.user_id,
          name: user.name,
          email: user.email,
          theme_preference: preferences.theme,
          badge_preference: preferences.badge,
        }
      }
    };
  }

  async updatePreferences(request, h) {
    const { theme, badge } = request.payload || {};
    const userId = request.auth && request.auth.credentials && request.auth.credentials.id;
    if (!userId) {
      return h.response({ status: 'fail', message: 'Unauthorized' }).code(401);
    }

    try {
      const updated = await this._service.updatePreferences(userId, { theme, badge });
      return {
        status: 'success',
        message: 'Preferences updated',
        data: {
          preferences: {
            theme: updated.theme,
            badge: updated.badge,
          }
        }
      };
    } catch (err) {
      console.error('Failed to update preferences:', err.message);
      return h.response({ status: 'error', message: 'Gagal menyimpan preferensi' }).code(500);
    }
  }

  async logout(request, h) {
    // Allow client to send preferences on logout to be saved
    const { theme, badge } = request.payload || {};
    const userId = request.auth && request.auth.credentials && request.auth.credentials.id;
    if (!userId) {
      return h.response({ status: 'fail', message: 'Unauthorized' }).code(401);
    }

    try {
      await this._service.updatePreferences(userId, { theme, badge });
      return {
        status: 'success',
        message: 'Logout successful',
      };
    } catch (err) {
      console.error('Failed to save preferences on logout:', err.message);
      return h.response({ status: 'error', message: 'Gagal saat logout' }).code(500);
    }
  }
}

module.exports = AuthHandler;
