const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const { createWorkspace, getAllWorkspaces, addMember } = require("../controllers/workspaceController");

router.post("/", authMiddleware, createWorkspace);

router.get("/", authMiddleware, getAllWorkspaces);

router.post("/:workspaceId/members", authMiddleware, addMember);

module.exports = router;