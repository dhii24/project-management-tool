const mongoose = require("mongoose");

const attachmentSchema = new mongoose.Schema(
    {
        card: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Card",
            required: true
        },

        uploadedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        // This is the actual filename uploaded by the user.
        originalName: {
            type: String,
            required: true
        },

        fileName: {
            type: String,
            required: true
        },

        filePath: {
            type: String,
            required: true
        },

        // This tells us what kind of file it is.
        mimeType: {
            type: String,
            required: true
        },

        // Stores the file size.
        size: {
            type: Number,
            required: true
        }

    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Attachment", attachmentSchema);