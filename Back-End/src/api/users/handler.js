const UsersService = require('../../services/UserServices');

class UsersHandler {
  constructor() {
    this._service = new UsersService();
    this.me = this.me.bind(this);
    this.preferences = this.preferences.bind(this);
    this.updatePreferences = this.updatePreferences.bind(this);
  }

  async me(request) {
    const userId = request.auth.credentials.id;
    const user = await this._service.getUserById(userId);
    return { status: 'success', data: user };
  }

  async preferences(request) {
    const userId = request.auth.credentials.id;
    const prefs = await this._service.getPreferencesByUserId(userId);
    return { status: 'success', data: prefs };
  }

  async updatePreferences(request) {
    const userId = request.auth.credentials.id;
    const payload = request.payload || {};
    const prefs = await this._service.updatePreferences(userId, {
      theme: Object.prototype.hasOwnProperty.call(payload, 'theme') ? payload.theme : undefined,
      badge: Object.prototype.hasOwnProperty.call(payload, 'badge') ? payload.badge : undefined,
    });
    return { status: 'success', data: prefs };
  }
}

module.exports = UsersHandler;
