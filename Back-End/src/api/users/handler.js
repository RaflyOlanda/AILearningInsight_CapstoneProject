const UsersService = require('../../services/UserServices');

class UsersHandler {
  constructor() {
    this._service = new UsersService();
  }

  async me(request) {
    const userId = request.auth.credentials.id;
    const user = await this._service.getUserById(userId);
    return { status: 'success', data: user };
  }
}

module.exports = UsersHandler;
