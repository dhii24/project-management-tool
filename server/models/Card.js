const mongoose = require("mongoose");

const cardSchema = new mongoose.Schema(
    {
        title:{
            type:String,
            required:true,
            trim:true
        },

        description:{
            type:String,
            default:"",
            trim:true
        },

        list:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"List",
            required:true
        },

        position:{
            type:Number,
            default:0,
            required:true
        },

        dueDate:{
            type:Date
        },

        labels:{
            type: [String],
            default: []
        },

        assignedMembers:[
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User"
            }
        ],

        attachments:[
            {
                fileName: String,
                path: String
            }
        ]
    },
    {
        timestamps:true
    }
);



const Card =  mongoose.model("Card", cardSchema);

module.exports = Card;