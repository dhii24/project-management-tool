const express = require('express')

const router = express.Router();

const { registerUser, loginUser, getProfile, adminDashboard} = require("../controllers/userController")
const authMiddleware = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/authorizeRoles");

router.post("/register", registerUser);

router.post("/login", loginUser);

router.get("/profile", authMiddleware, getProfile);

router.get("/admin", authMiddleware, authorizeRoles("admin"), adminDashboard);

module.exports = router;
