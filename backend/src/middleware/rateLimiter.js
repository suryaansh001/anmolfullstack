const rateLimit = require('express-rate-limit');
const { RedisStore } = require('rate-limit-redis');
const { redis } = require('../config/redis');

function createLimiter({ max, windowMs }) {
  return rateLimit({
    max,
    windowMs,
    standardHeaders: true,
    legacyHeaders: false,
    store: new RedisStore({
      sendCommand: (...args) => redis.call(...args)
    })
  });
}

module.exports = createLimiter;
