const Card = require("../models/Card");
const List = require("../models/List");
const User = require("../models/User");
const createNotification = require("../utils/createNotification");

const createCard = async (req, res) => {

    try{

        const { listId } = req.params;

        const { title, description, dueDate, labels, assignedMembers } = req.body;

        const totalCards = await Card.countDocuments({
            list: listId
        })
        
        const card = await Card.create({
            title,
            description,
            dueDate,
            labels,
            assignedMembers,
            list: listId,
            position: totalCards
        });


        res.status(201).json({
            message:"Card created successfully",
            card
        });

    } catch (error) {
        res.status(500).json({
            message:error.message
        });
    }

};


const getCards = async(req,res)=>{

    try{

        const {listId} = req.params;

        const page = parseInt(req.query.page) || 1;

        const limit = parseInt(req.query.limit) || 1;

        const skip = (page - 1) * limit;

        const cards = await Card.find({
            list:listId
        })
        .sort({
            position:1
        })
        .skip(skip)
        .limit(limit);

        const totalCards = await Card.countDocuments({
            list: listId
        });

        const totalPages = Math.ceil(totalCards / limit);

        res.status(200).json({
            cards,
            pagination:{
                currentPage: page,
                totalPages,
                totalCards,
                limit
            }
        });

    } catch (error) {
        res.status(500).json({
            message:error.message
        });
    }

};


const updateCard = async (req,res) => {

    try{
        
        const { cardId } = req.params;

        const card = await Card.findOne({
            _id: cardId,
            list: req.list._id
        });

        if(!card){
            return res.status(404).json({
                message: "Card not found"
            });
        }

        const { title, description, dueDate, labels, assignedMembers } = req.body;

        if(title !== undefined){
            card.title = title;
        }

        if(description !== undefined){
            card.description = description;
        }

        if(dueDate !== undefined){
            card.dueDate = dueDate;
        }

        if(labels != undefined){
            card.labels = labels;
        }

        if(assignedMembers != undefined){
            card.assignedMembers = assignedMembers;

            if(assignedMembers){
                const sender = await User.findById(req.user.userId);
                
                for(const memberId of assignedMembers){
                    if(memberId.toString() !== req.user.userId){
                        await createNotification({
                            recipient: memberId,
                            sender: sender._id,
                            card: card._id,
                            type: "CARD_ASSIGNED",
                            message: `${sender.name} assigned you to ${card.title}`
                        });
                    }
                }
            }
        }

        await card.save();

        res.status(200).json({
            message: "Card updated successfully",
            card
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};


const deleteCard = async (req, res) => {

    try{

        const { cardId } = req.params;

        const card = await Card.findOne({
            _id: cardId,
            list: req.list._id
        });

        if(!card){

            return res.status(404).json({
                message: "Card not found"
            });
        }

        res.status(200).json({
            message: "Card deleted successfully"
        });

        await Card.deleteOne();

    } catch (error) {

        res.status(500).json({
            message: error.message
        });
    }

};


const moveCard = async (req, res) => {

    try {

        const { cardId } = req.params;

        const { targetListId, newPosition} = req.body;

        const card = await Card.findOne({
            _id: cardId,
            list: req.list._id
        });

        if(!card){
            return res.status(404).json({
                message: "Card not found"
            });
        }

        const targetList = await List.findById(targetListId);

        if(!targetList){
            return res.status(404).json({
                message: "Target list not found"
            });
        }

        const cards = await Card.find({
            list: targetListId
        }).sort({
            position: 1
        });

        cards.splice(newPosition, 0, card);

        for (let i = 0; i < cards.length; i++) {
            cards[i].list = targetListId;
            cards[i].position = i;

            await cards[i].save();
        }

        res.status(200).json({
            message: "Card moved successfully"
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }

};


const uploadAttachment = async (req, res) => {

    try {
        console.log("Inside controller");
        console.log(req.file);

        if (!req.file) {
            return res.status(400).json({
                message: "No file uploaded"
            });
        }

        const { cardId } = req.params;

        const card = await Card.findById(cardId);

        if(!card){
            return res.status(404).json({
                message: "Card not found"
            });
        }

        card.attachments.push({
            fileName: req.file.filename,
            filePath: req.file.path
        });

        await card.save();

        res.status(200).json({
            message: "File uploaded.",
            attachment: req.file.filename
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }

};

const searchCards = async (req, res) => {

    try{
        const { query, page = 1, limit = 10} = req.query;

        const currentPage = parseInt(page);
        const pageLimit =  parseInt(limit);

        const skip = (currentPage -1) * pageLimit;

        const searchFilter = {};

        if(query){
            searchFilter.$or =[

                {
                    title:{
                        $regex: query,
                        $options: "i"
                    },
                },

                {
                    labels:{
                        $regex: query,
                        $options: "i"
                    }
                }
                
            ]
        }

        const cards = await Card.find(searchFilter).sort({ createdAt: -1}).skip(skip).limit(limit);

        const totalCards = await Card.countDocuments(
            searchFilter
        );

        res.status(200).json({
            cards,
            pagination:{
                currentPage,
                totalPages: Math.max(1, Math.ceil(totalCards / pageLimit)),
                totalCards,
                limit: pageLimit
            }
        });
        
    } catch (error) {

        res.status(500).json({
            message: error.message
        })

    }
};


module.exports = { createCard, getCards, updateCard, deleteCard, moveCard, uploadAttachment, searchCards };     