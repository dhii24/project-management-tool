const jwt = require("jsonwebtoken");

const authMiddleware = (req,res,next) => {
    try {
        const authHeader = req.headers.authorization;

        if(!authHeader || !authHeader.startsWith("Bearer ")){
            return res.status(401).json({
                message: "Access denied. No token provided"
            })
        }

        const token = authHeader.split(" ")[1];

        req.user = jwt.verify(token, process.env.JWT_SECRET);

        next();
    } catch (error) {
        return res.status(401).json({
            message: "Invalid or Expired Token."
        });
    }
}

module.exports = authMiddleware;