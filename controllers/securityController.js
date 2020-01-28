const AppError = require('./../utils/appError');
const allowedClients = require('./../statics/allowedClients');

exports.protectFromClient = (req, res, next) => {
  const clientId = req.get('X-Client-Id');
  if (!clientId) {
    return next(
      new AppError('This client is not allowed to call the api.', 401)
    );
  }

  if (!allowedClients.includes(clientId)) {
    return next(
      new AppError('This client is not allowed to call the api.', 401)
    );
  }

  res.set('X-Client-Id', clientId);
  next();
};
