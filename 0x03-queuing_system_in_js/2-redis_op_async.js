/**
 * Establishing redis server connection on the localhost
 * Adding setter and async getter function
 */
import * as redis from "redis";
import { promisify } from 'util';

const redisClient = redis.createClient();

redisClient.on('error', error => console.log(`Redis client not connected to the server: ${error.message}`));

redisClient.on('connect', () => console.log('Redis client connected to the server'));


function setNewSchool(schoolName, value) {
  redisClient.set(schoolName, value, redis.print);
}

async function displaySchoolValue(schoolName) {
  const asyncGet = promisify(redis.RedisClient.prototype.get);
  try {
    const data = await asyncGet.apply(redisClient, [schoolName]);
    console.log(data);
  } catch (err) {
    // console.log(err.message);
  }
}

displaySchoolValue('Holberton');
setNewSchool('HolbertonSanFrancisco', '100');
displaySchoolValue('HolbertonSanFrancisco');
