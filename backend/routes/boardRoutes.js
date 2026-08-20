const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const { createBoard, getBoards, updateBoard, deleteBoard, getBoardByID } = require("../controllers/boardController"); 
const workspaceMemberMiddleware = require("../middleware/workspaceMemberMiddleware");

router.post("/:workspaceId", authMiddleware, workspaceMemberMiddleware, createBoard);

router.get("/:workspaceId", authMiddleware,  workspaceMemberMiddleware, getBoards);

router.get("/:workspaceId/:boardId", authMiddleware, workspaceMemberMiddleware, getBoardByID);

router.put("/:workspaceId/:boardId",authMiddleware, workspaceMemberMiddleware, updateBoard);

router.delete("/:workspaceId/:boardId", authMiddleware, workspaceMemberMiddleware, deleteBoard);

module.exports = router;