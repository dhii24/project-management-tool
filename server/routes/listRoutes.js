const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const boardMemberMiddleware = require("../middleware/boardMemberMiddleware");
const { createList, getLists, updateList, deleteList, moveList } = require("../controllers/listController");


router.post("/:boardId", authMiddleware, boardMemberMiddleware, createList);

router.get("/:boardId", authMiddleware, getLists);

router.put("/:boardId/:listId", authMiddleware, boardMemberMiddleware, updateList);

router.delete("/:boardId/:listId", authMiddleware, boardMemberMiddleware, deleteList);

router.patch("/:boardId/:listId/move", authMiddleware, boardMemberMiddleware, moveList);

module.exports = router;