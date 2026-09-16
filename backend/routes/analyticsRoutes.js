const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const { getCardsByStatus, getCardsByLabel, getMemberWorkload, getUpcomingDueCards, getWorkspaceStats } = require("../controllers/analyticsController");
const workspaceMemberMiddleware = require("../middleware/workspaceMemberMiddleware");

router.get("/:workspaceId/status", authMiddleware, workspaceMemberMiddleware,getCardsByStatus);

router.get("/:workspaceId/labels", authMiddleware, workspaceMemberMiddleware,getCardsByLabel);

router.get("/:workspaceId/workload", authMiddleware, workspaceMemberMiddleware,getMemberWorkload);

router.get("/:workspaceId/due-this-week", authMiddleware, workspaceMemberMiddleware,getUpcomingDueCards);

router.get("/:workspaceId/workspace", authMiddleware, workspaceMemberMiddleware,getWorkspaceStats);

module.exports = router;