const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const { getCardsByStatus, getCardsByLabel, getMemberWorkload, getUpcomingDueCards, getWorkspaceStats } = require("../controllers/analyticsController");

router.get("/status", authMiddleware, getCardsByStatus);

router.get("/labels", authMiddleware, getCardsByLabel);

router.get("/workload", authMiddleware, getMemberWorkload);

router.get("/due-this-week", authMiddleware, getUpcomingDueCards);

router.get("/workspace", authMiddleware, getWorkspaceStats);

module.exports = router;