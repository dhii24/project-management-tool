const express = require("express");

const authMiddleware = require("../middleware/authMiddleware");
const { createCard, getCards, updateCard, deleteCard, moveCard, searchCards } = require("../controllers/cardController");
const listMemberMiddleware = require("../middleware/listMemberMiddleware");
const uploadAttachment = require("../controllers/attachmentController");
const upload = require("../middleware/uploadMiddleware");

const router = express.Router();

router.post("/:listId", authMiddleware, listMemberMiddleware, createCard);

router.get("/:listId", authMiddleware, listMemberMiddleware, getCards);

router.put("/:listId/:cardId", authMiddleware, listMemberMiddleware, updateCard);

router.delete("/:listId/:cardId", authMiddleware, listMemberMiddleware, deleteCard);

router.patch("/:listId/:cardId/move", authMiddleware, listMemberMiddleware, moveCard);



module.exports = router;