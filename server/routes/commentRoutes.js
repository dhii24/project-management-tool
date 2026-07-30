const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const { createComment, getComments } = require("../controllers/commentController");

router.post("/:cardId", authMiddleware, createComment);

router.get("/:cardId", authMiddleware, getComments);

module.exports = router;