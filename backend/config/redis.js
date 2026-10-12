
const { createClient } = require("redis");

const redisClient = createClient({
    url: process.env.REDIS_URL
});

redisClient.on("error", (error) => {
    console.error("Redis Client Error:", error.message);
});

redisClient.on("connect", () => {
    console.log("Connecting to Redis...");
});

redisClient.on("ready", () => {
    console.log("Redis connection ready.");
});

redisClient.on("reconnecting", () => {
    console.log("Reconnecting to Redis...");
});

const connectRedis = async () => {
    if (!process.env.REDIS_URL) {
        console.log(
            "REDIS_URL not configured. Redis cache disabled in this environment."
        );
        return false;
    }

    if (redisClient.isOpen) {
        return true;
    }

    await redisClient.connect();
    return true;
};

module.exports = {
    redisClient,
    connectRedis
};