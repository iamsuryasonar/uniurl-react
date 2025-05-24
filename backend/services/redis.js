const Redis = require("ioredis");

const redisUri = `rediss://${process.env.REDIS_USER}:${process.env.REDIS_PASSWORD}@${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`

let redis;
let isRedisActive = false;
redis = new Redis(redisUri, {
    retryStrategy: (retryCount) => {
        console.warn(`Redis retry attempt #${retryCount}`);
        return 600000; // retry every 10 minutes
    },
});

redis.on('connect', () => {
    isRedisActive = true;
    console.log('Redis connected');
});

redis.on('error', (err) => {
    console.error('[Redis Error]', err.message);
});

module.exports = {
    redis,
    isRedisActive
};