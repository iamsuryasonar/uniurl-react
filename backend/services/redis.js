const Redis = require("ioredis");

const redisUri = `rediss://${process.env.REDIS_USER}:${process.env.REDIS_PASSWORD}@${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`
console.log(redisUri)
const redis = new Redis(redisUri);
redis.on('connect', () => {
    console.log('Redis connected');
});

redis.set('key', 'hello', "EX", 10);

redis.get('key').then(function (result) {
    console.log(`The value of key is: ${result}`);
});


module.exports = { redis: redis };