const { redisClient } = require("../config/redis");

const invalidateWorkspaceAnalytics = async (workspaceId) => {
    if (!redisClient.isReady) {
        return false;
    }

    const id = workspaceId.toString();

    const cacheKeys = [
        `analytics:${id}:status`,
        `analytics:${id}:labels`,
        `analytics:${id}:workload`,
        `analytics:${id}:due-this-week`,
        `analytics:${id}:workspace`
    ];

    try {
        await redisClient.del(cacheKeys);
        console.log(`[CACHE INVALIDATED] analytics:${id}:*`);
        return true;
    } catch (error) {
        console.error(
            "Redis analytics invalidation error:",
            error.message
        );
        return false;
    }
};

module.exports = invalidateWorkspaceAnalytics;
