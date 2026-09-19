const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const { getActivities } = require("../controllers/activityController");
const cardMemberMiddleware = require("../middleware/cardMemberMiddleware");

const router = express.Router();

router.get("/:cardId", authMiddleware, cardMemberMiddleware,getActivities);

module.exports = router;