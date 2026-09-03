const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");

const { uploadAttachment, getAttachments } = require("../controllers/attachmentController");

router.post("/:cardId/upload", authMiddleware, upload.single("attachment"), uploadAttachment);

router.get("/:cardId", authMiddleware, getAttachments);

module.exports = router;