const mongoose = require("mongoose");

const boardSchema = new mongoose.Schema(
    {
        name:{
            type: String,
            required: true,
            trim: true
        },

        description:{
            type: String,
            default: "",
            trim: true
        },

        workspace:{
            type: mongoose.Schema.Types.ObjectId,
            reference: "Workspace",
            required: true
        }
    },
    {
        timestamps: true
    }
)

const Board = mongoose.model("Board", boardSchema);

module.exports = Board;