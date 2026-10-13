const { redisClient } = require("../config/redis");

const rateLimitMiddleware = ({
    prefix,
    limit = 5,
    windowSeconds = 15 * 60
}) => {
    return async (req, res, next) => {
        if (!redisClient.isReady) {
            console.warn("Redis unavailable. Rate limiting skipped.");
            return next();
        }

        try {
            const ip = req.ip || req.socket.remoteAddress || "unknown";
            const key = `rate-limit:${prefix}:${ip}`;

            const count = await redisClient.incr(key);

            if (count === 1) {
                await redisClient.expire(key, windowSeconds);
            }

            if (count > limit) {
                return res.status(429).json({
                    message: "Too many requests. Please try again later."
                });
            }

            next();
        } catch (error) {
            console.error("Rate limiter error:", error.message);

            return res.status(503).json({
                message: "Authentication service temporarily unavailable. Please try again."
            });
        }
    };
};

module.exports = rateLimitMiddleware;