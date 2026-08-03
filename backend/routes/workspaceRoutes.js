const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const workspaceOwnerMiddleware = require("../middleware/workspaceOwnerMiddleware");
const { createWorkspace, getAllWorkspaces, addMember, getMyWorkspaces, updateWorkspace, deleteWorkspace } = require("../controllers/workspaceController");

router.post("/", authMiddleware, createWorkspace);

router.get("/", authMiddleware, getAllWorkspaces);

router.post("/:workspaceId/members", authMiddleware, workspaceOwnerMiddleware, addMember);

router.get("/my", authMiddleware, getMyWorkspaces);

router.put("/:workspaceId", authMiddleware, workspaceOwnerMiddleware, updateWorkspace);

router.delete("/:workspaceId", authMiddleware, workspaceOwnerMiddleware, deleteWorkspace);

module.exports = router;