require("dotenv").config();

const app = require("./app");
const connectDB = require("./config/db");
const { connectRedis } = require("./config/redis");

const PORT = process.env.PORT || 5000;

const startServer = async () => {
    try {
        await connectDB();

        try {
            const redisConnected = await connectRedis();

            if (redisConnected) {
                console.log("Redis connected successfully.");
            } else {
                console.log("Redis cache disabled. Continuing with MongoDB.");
            }
        } catch (error) {
            console.error(
                "Redis unavailable. Continuing without cache:",
                error.message || error.code || "Unknown Redis error"
            );
        }

        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (error) {
        console.error(error);
    }
};

startServer();