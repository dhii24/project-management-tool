const Card = require("../models/Card");
const List = require("../models/List");
const User = require("../models/User");
const createNotification = require("../utils/createNotification");

const createCard = async (req, res) => {

    try{

        const { listId } = req.params;

        const { title, description, priority, dueDate, labels, assignedMembers } = req.body;

        const totalCards = await Card.countDocuments({
            list: listId
        })
        
        const card = await Card.create({
            title,
            description,
            priority,
            dueDate,
            labels,
            assignedMembers,
            list: listId,
            position: totalCards
        });

        await card.populate("assignedMembers", "name email role");

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

        const limit = parseInt(req.query.limit) || 50;

        const skip = (page - 1) * limit;

        const cards = await Card.find({
            list:listId
        })
        .populate(
            "assignedMembers",
            "name email role"
        )
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

        const { title, description, dueDate, labels, assignedMembers, priority } = req.body;

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

        if(priority !== undefined){
            card.priority = priority;
        }

        await card.save();

        await card.populate("assignedMembers", "name email role");

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

        await Card.deleteOne({
            _id: cardId,
            list: req.list._id
        });

        res.status(200).json({
            message: "Card deleted successfully"
        });


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

        // Find the card in the current list
        const card = await Card.findOne({
            _id: cardId,
            list: req.list._id
        });

        if(!card){
            return res.status(404).json({
                message: "Card not found"
            });
        }

        // Find target list
        const targetList = await List.findById(targetListId);

        if(!targetList){
            return res.status(404).json({
                message: "Target list not found"
            });
        }

        // Make sure target list belongs to the same board
        if (targetList.board.toString() !== req.list.board.toString()){
            return res.status(403).json({
                message: "Target list does not belong to the same board"
            });
        }

        const sourceListId = card.list;

        // Get cards from source list
        const sourceCards = await Card.find({
            list: sourceListId
        }).sort({
            position: 1
        });

        // Get cards from target list
        const targetCards = await Card.find({
            list: targetListId
        }).sort({
            position: 1
        });

        // CASE 1: Moving within the same list
        if(sourceListId.toString() === targetListId.toString()){

            const currentIndex = sourceCards.findIndex(
                currentCard => currentCard._id.toString() === cardId
            );

            if(currentIndex === -1){
                return res.status(404).json({
                    message: "Card not found in source list"
                });
            }

            // Remove card from current position
            const [movedCard] = sourceCards.splice(currentIndex, 1);

            // Keep position within valid range
            const safePosition = Math.max(0, Math.min(newPosition, sourceCards.length));

            // Insert card at new position
            sourceCards.splice(safePosition, 0, movedCard);

            // Recalculate positions
            for(let i = 0; i < sourceCards.length; i++){
                sourceCards[i].position = i;
                await sourceCards[i].save();
            }
        }   
        
        // CASE 2: Moving to another list
        else {
            // Remove card from source list
            const sourceIndex = sourceCards.findIndex(
                currentCard => currentCard._id.toString() === cardId
            );

            if(sourceIndex === -1){
                return res.status(404).json({
                    message: "Card not found in source list"
                });
            }

            sourceCards.splice(sourceIndex, 1);

            // Recalculate source list positions
            for(let i = 0; i < sourceCards.length; i++){
                sourceCards[i].position = i;
                await sourceCards[i].save();
            }

            // Remove the card from targetCards
            // in case of any unexpected stale relationship
            const existingTargetIndex = targetCards.findIndex(
                currentCard => currentCard._id.toString() === cardId
            );

            if (existingTargetIndex !== -1) {
                targetCards.splice(existingTargetIndex, 1);
            }

            // Keep target position within valid range
            const safePosition = Math.max(0, Math.min(newPosition, targetCards.length));

            // Insert moved card
            targetCards.splice(safePosition, 0, card);

            // Update target list + positions
            for (let i = 0; i < targetCards.length; i++) {
                targetCards[i].list = targetListId;
                targetCards[i].position = i;
                await targetCards[i].save();
            }
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
            path: req.file.path
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