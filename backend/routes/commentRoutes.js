const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const { createComment, getComments } = require("../controllers/commentController");
const cardMemberMiddleware = require("../middleware/cardMemberMiddleware");

router.post("/:cardId", authMiddleware, cardMemberMiddleware,createComment);

router.get("/:cardId", authMiddleware, cardMemberMiddleware, getComments);

module.exports = router;