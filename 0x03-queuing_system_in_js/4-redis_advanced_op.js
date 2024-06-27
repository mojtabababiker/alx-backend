/**
 * Establishing redis server connection on the localhost
 * Use more complex redis data structure (hash)
 */
import * as redis from "redis";

const redisClient = redis.createClient();

redisClient.on('error', error => console.log(`Redis client not connected to the server: ${error.message}`));

redisClient.on('connect', () => console.log('Redis client connected to the server'));

const values = {
  'Portland': 50,
  'Seattle': 80,
  'New York': 20,
  'Bogota': 20,
  'Cali': 40,
  'Paris': 2,
};

for (const [key, val] of Object.entries(values)) {
  redisClient.hset('HolbertonSchools', key, val, redis.print);
}

redisClient.hgetall('HolbertonSchools', (error, data) => {
  console.log(data);
});
