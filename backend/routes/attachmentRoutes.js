const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");

const { uploadAttachment, getAttachments } = require("../controllers/attachmentController");
const cardMemberMiddleware = require("../middleware/cardMemberMiddleware");

router.post("/:cardId/upload", authMiddleware,cardMemberMiddleware, upload.single("attachment"), uploadAttachment);

router.get("/:cardId", authMiddleware, cardMemberMiddleware, getAttachments);

module.exports = router;