const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const { getActivities } = require("../controllers/activityController");

const router = express.Router();

router.get("/:cardId", authMiddleware, getActivities);

module.exports = router;