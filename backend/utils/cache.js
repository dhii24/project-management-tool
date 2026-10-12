const { redisClient } = require("../config/redis");

const getCache = async (key) => {
    if (!redisClient.isReady) {
        return null;
    }

    try {
        const cachedData = await redisClient.get(key);

        if (cachedData === null) {
            console.log(`[CACHE MISS] ${key}`);
        } else {
            console.log(`[CACHE HIT] ${key}`);
        }

        if (cachedData === null) {
            return null;
        }

        return JSON.parse(cachedData);
    } catch (error) {
        console.error("Redis cache read error:", error.message);
        return null;
    }
};

const setCache = async (key, data, ttlSeconds = 60) => {
    if (!redisClient.isReady) {
        return false;
    }

    try {
        await redisClient.set(key, JSON.stringify(data), {
            EX: ttlSeconds
        });

        return true;
    } catch (error) {
        console.error("Redis cache write error:", error.message);
        return false;
    }
};

const deleteCache = async (key) => {
    if (!redisClient.isReady) {
        return false;
    }

    try {
        await redisClient.del(key);
        return true;
    } catch (error) {
        console.error("Redis cache delete error:", error.message);
        return false;
    }
};

module.exports = {
    getCache,
    setCache,
    deleteCache
};