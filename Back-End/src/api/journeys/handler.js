const JourneysService = require('../../services/JourneysServices');

class JourneysHandler {
  constructor() {
    this._service = new JourneysService();
  }

  async list(request) {
    const journeys = await this._service.getAll();
    return { status: 'success', data: journeys };
  }

  async detail(request) {
    const journey = await this._service.getById(request.params.id);
    return { status: 'success', data: journey };
  }
}

module.exports = JourneysHandler;
