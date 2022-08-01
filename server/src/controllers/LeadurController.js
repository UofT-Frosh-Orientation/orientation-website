const LeadurServices = require('../services/LeadurServices');

const LeadurController = {
  async requestAuthScopes(req, res, next) {
    try {
      const user = req.user;
      const { authScopes, froshFields } = req.body;
      const updated = LeadurServices.requestScopesAndData(user, froshFields, authScopes);
      res.status(200).send({ message: 'Successfully requested scopes and data!', user: updated });
    } catch (e) {
      console.log(e);
      next(e);
    }
  },
};

module.exports = LeadurController;
