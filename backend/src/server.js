const app = require('./app');
const env = require('./config/env');
const logger = require('./config/logger');
const { connectMongo, disconnectMongo } = require('./config/database');
const { connectRedis, disconnectRedis } = require('./config/redis');
const Content = require('./models/Content');
const ArchivedVersion = require('./models/ArchivedVersion');
const Rating = require('./models/Rating');
const User = require('./models/User');

async function bootstrap() {
  await connectMongo();
  await Promise.all([Content.init(), ArchivedVersion.init(), Rating.init(), User.init()]);
  await connectRedis();

  const server = app.listen(env.PORT, () => {
    logger.info(`Akshar backend listening on port ${env.PORT}`);
  });

  async function shutdown(signal) {
    logger.warn(`Received ${signal}, shutting down`);
    server.close(async () => {
      await disconnectRedis();
      await disconnectMongo();
      process.exit(0);
    });
  }

  process.on('SIGINT', () => shutdown('SIGINT'));
  process.on('SIGTERM', () => shutdown('SIGTERM'));
}

bootstrap().catch((error) => {
  logger.error('Failed to bootstrap server', { error: error.message });
  process.exit(1);
});
