const logger = require('../config/logger');

function errorHandler(error, req, res, next) {
  logger.error('Request failed', {
    method: req.method,
    path: req.originalUrl,
    message: error.message
  });

  if (error.name === 'CastError') {
    return res.status(400).json({ error: 'Invalid identifier format' });
  }

  if (error.code === 11000) {
    return res.status(409).json({ error: 'Duplicate record conflict' });
  }

  return res.status(error.statusCode || 500).json({
    error: error.message || 'Internal server error'
  });
}

module.exports = errorHandler;
