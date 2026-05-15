const Redis = require('ioredis');
const env = require('./env');
const logger = require('./logger');

const redis = new Redis(env.REDIS_URL, {
  lazyConnect: true,
  maxRetriesPerRequest: null,
  enableReadyCheck: true
});

redis.on('connect', () => logger.info('Redis socket connected'));
redis.on('ready', () => logger.info('Redis ready'));
redis.on('error', (error) => logger.error('Redis error', { error: error.message }));
redis.on('close', () => logger.warn('Redis connection closed'));

async function connectRedis() {
  if (redis.status === 'wait' || redis.status === 'end') {
    await redis.connect();
  }

  await redis.ping();
}

async function disconnectRedis() {
  if (redis.status !== 'end') {
    await redis.quit();
  }
}

module.exports = {
  redis,
  connectRedis,
  disconnectRedis
};
