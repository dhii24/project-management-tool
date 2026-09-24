const Attachment = require("../models/Attachment");
const createActivity = require("../utils/createActivity");
const User = require("../models/User");
const cloudinary = require("../config/cloudinary");

const uploadAttachment = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                message: "No file uploaded"
            });
        }

        const { cardId } = req.params;

        const uploadResult = await new Promise((resolve, reject) => {

            const uploadStream = cloudinary.uploader.upload_stream(
                {
                    folder: "project-management/attachments",
                    resource_type: "auto"
                },
                (error, result) => {

                    if (error) {
                        reject(error);
                    } else {
                        resolve(result);
                    }

                }
            );

            uploadStream.end(req.file.buffer);

        });

        const attachment = await Attachment.create({
            card: cardId,
            uploadedBy: req.user.userId,
            originalName: req.file.originalname,
            fileName: uploadResult.public_id,
            filePath: uploadResult.secure_url,
            mimeType: req.file.mimetype,
            size: req.file.size
        });

        await attachment.populate("uploadedBy", "name email");

        const user = await User.findById(
            req.user.userId
        );

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

    } 
    
    catch (error) {
        res.status(500).json({
            message: error.message
        });
    }

};

const getAttachments = async (req, res) => {
    try{
        const { cardId } = req.params;

        const attachments = await Attachment.find({
            card: cardId
        })
        .populate("uploadedBy", "name email")
        .sort({
            createdAt: 1
        });

        res.status(200).json({
            attachments
        });
    }
    catch(error){
        res.status(500).json({
            message: error.message
        });
    }
};

module.exports = { uploadAttachment, getAttachments };