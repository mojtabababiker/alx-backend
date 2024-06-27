/**
 * Establishing redis server connection on the localhost
 * Use more complex redis concepts subscriber and publisher
 */
import * as redis from "redis";

const redisClient = redis.createClient();

redisClient.on('error', error => console.log(`Redis client not connected to the server: ${error.message}`));

redisClient.on('connect', () => console.log('Redis client connected to the server'));

redisClient.on('message', (channel, message) => {
  if (channel === 'holberton school channel') {
    if (message === 'KILL_SERVER') {
      redisClient.unsubscribe('holberton school channel', () => {
        redisClient.quit();
      });
      return;
    }
    console.log(message);
  }
});

redisClient.subscribe('holberton school channel');
