const InsightsService = require('../../services/InsightsServices');

class InsightsHandler {
  constructor() {
    this._service = new InsightsService();
  }

  async myInsights(request) {
    const userId = request.auth.credentials.id;
    const data = await this._service.getUserStudyHistory(userId);

    return {
      status: 'success',
      data
    };
  }
}

module.exports = InsightsHandler;
