const UsersService = require('../../services/UserServices');
const { generateToken } = require('../../utils/tokenize');

class AuthHandler {
  constructor() {
    this._service = new UsersService();
    this.login = this.login.bind(this);
  }

  async login(request, h) {
    const { email, password } = request.payload;

    const user = await this._service.getUserByEmail(email);
    if (!user) {
      return h.response({ status: 'fail', message: 'Email tidak ditemukan' }).code(404);
    }

    // Plaintext compare per current DB policy
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
}

module.exports = AuthHandler;
