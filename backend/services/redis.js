const Redis = require("ioredis");

const redisUri = `rediss://${process.env.REDIS_USER}:${process.env.REDIS_PASSWORD}@${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`

const redis = new Redis(redisUri);
redis.on('connect', () => {
    console.log('Redis connected');
});

module.exports = { redis: redis };