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

cardSchema.index({
    title: "text",
    labels: "text"
});

cardSchema.index({
    dueDate:1
});

cardSchema.index({
    list:1
});

cardSchema.index({
    assignedMembers:1
});

module.exports =  mongoose.model("Card", cardSchema);
