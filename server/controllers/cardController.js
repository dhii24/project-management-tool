const Card = require("../models/Card");
const List = require("../models/List");

const createCard = async (req, res) => {

    try{

        const { listId } = req.params;

        const { title, description, dueDate } = req.body;

        const totalCards = await Card.countDocuments({
            list: listId
        })
        
        const card = await Card.create({
            title,
            description,
            dueDate,
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

        const {listId}=req.params;

        const cards = await Card.find({
            list:listId
        })
        .sort({
            position:1
        });

        res.status(200).json({
            cards
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

        const { title, description, dueDate } = req.body;

        if(title !== undefined){
            card.title = title;
        }

        if(description !== undefined){
            card.description = description;
        }

        if(dueDate !== undefined){
            card.dueDate = dueDate;
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

        await card.deleteOne();

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

module.exports = { createCard, getCards, updateCard, deleteCard, moveCard };