const Redis = require("ioredis");

const redisUri = `rediss://${process.env.REDIS_USER}:${process.env.REDIS_PASSWORD}@${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`

let redis;

try {
    redis = new Redis(redisUri);
    redis.on('connect', () => {
        console.log('Redis connected');
    });
} catch (error) {
    console.log('error connecting to Redis')
}

module.exports = { redis: redis };