const Attachment = require("../models/Attachment");
const createActivity = require("../utils/createActivity");
const User = require("../models/User");

const uploadAttachment = async (req, res) => {
    try {

        console.log(req.file);

        if (!req.file) {
            return res.status(400).json({
                message: "No file uploaded"
            });
        }

        const { cardId } = req.params;

        const attachment = await Attachment.create({
            card: cardId,
            uploadedBy: req.user.userId,
            originalName: req.file.originalname,
            fileName: req.file.filename,
            filePath: req.file.path,
            mimeType: req.file.mimetype,
            size: req.file.size
        });

        const user = await User.findById(
            req.user.userId
        );

        console.log("Decoded JWT:", req.user);
        console.log("Fetched User:", user);

        await createActivity({
            card: cardId,
            user: user._id,
            action: "FILE_UPLOADED",
            description: `${user.name} uploaded ${req.file.originalname}`

        });

        res.status(201).json({
            message: "File uploaded successfully",
            attachment
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};

module.exports = { uploadAttachment };