const UsersService = require('../../services/UserServices');
const { generateToken } = require('../../utils/tokenize');
const { compare } = require('../../utils/bcrypt');

class AuthHandler {
  constructor() {
    this._service = new UsersService();
  }

  async login(request, h) {
    const { email, password } = request.payload;

    const user = await this._service.getUserByEmail(email);
    if (!user) {
      return h.response({ status: 'fail', message: 'Email tidak ditemukan' }).code(404);
    }

    const isValid = await compare(password, user.password);
    if (!isValid) {
      return h.response({ status: 'fail', message: 'Password salah' }).code(401);
    }

    const token = generateToken({ id: user.user_id });

    return {
      status: 'success',
      message: 'Login berhasil',
      data: {
        token,
        user: {
          id: user.user_id,
          name: user.name,
          email: user.email,
        }
      }
    };
  }
}

module.exports = AuthHandler;
