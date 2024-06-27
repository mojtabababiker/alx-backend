/**
 * Establishing redis server connection on the localhost
 */
import { createClient } from "redis";

const redisClient = createClient();

redisClient.on('error', error => console.log(`Redis client not connected to the server: ${error.message}`));

redisClient.on('ready', () => console.log('Redis client connected to the server'));
