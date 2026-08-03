const mongoose = require("mongoose");

const listSchema = new mongoose.Schema(
    {
        title:{
            type: String,
            required: true,
            trim: true,
            minLength: 1
        },

        board:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Board",
            required: true
        },

        position:{
            type: Number,
            required: true,
            default: 0
        }
    },
    {
        timestamps: true
    }
);

const List = mongoose.model("List", listSchema);

module.exports = List;