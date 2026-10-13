const express = require('express')

const router = express.Router();

const { registerUser, loginUser, getProfile, adminDashboard} = require("../controllers/userController")
const authMiddleware = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/authorizeRoles");
const rateLimitMiddleware = require("../middleware/rateLimitMiddleware");

router.post("/register", rateLimitMiddleware({ prefix: "register", limit: 5 }), registerUser);

router.post("/login", rateLimitMiddleware({ prefix: "login", limit: 5 }), loginUser);

router.get("/profile", authMiddleware, getProfile);

router.get("/admin", authMiddleware, authorizeRoles("admin"), adminDashboard);

module.exports = router;
