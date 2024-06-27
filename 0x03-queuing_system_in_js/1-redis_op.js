/**
 * Establishing redis server connection on the localhost
 * Adding setter and getter function
 */
import * as redis from "redis";

const redisClient = redis.createClient();

redisClient.on('error', error => console.log(`Redis client not connected to the server: ${error.message}`));

redisClient.on('connect', () => console.log('Redis client connected to the server'));


function setNewSchool(schoolName, value) {
  redisClient.set(schoolName, value, redis.print);
}

function displaySchoolValue(schoolName) {
  redisClient.get(schoolName, (err, reply) => {
    console.log(reply);
  })
}

displaySchoolValue('Holberton');
setNewSchool('HolbertonSanFrancisco', '100');
displaySchoolValue('HolbertonSanFrancisco');
