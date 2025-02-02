import dotenv from 'dotenv';
import redis from 'redis';

dotenv.config();

const redisClient = redis.createClient({ url: process.env.REDIS_URL });
redisClient.on('error', (err) => console.log('Redis Client Error', err));
redisClient.connect();

export { redisClient };