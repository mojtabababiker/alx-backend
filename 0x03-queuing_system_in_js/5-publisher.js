/**
 * Establishing redis server connection on the localhost
 * Use more complex redis concepts subscriber and publisher
 */
import * as redis from "redis";

const redisClient = redis.createClient();

redisClient.on('error', error => console.log(`Redis client not connected to the server: ${error.message}`));

redisClient.on('connect', () => console.log('Redis client connected to the server'));

function publishMessage(message, time) {
  setTimeout(() => {
    console.log(`About to send ${message}`);
    redisClient.publish('holberton school channel', message);
  }, time)
}

publishMessage("Holberton Student #1 starts course", 100);
publishMessage("Holberton Student #2 starts course", 200);
publishMessage("KILL_SERVER", 300);
publishMessage("Holberton Student #3 starts course", 400);
