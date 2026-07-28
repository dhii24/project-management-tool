const Board = require("../models/Board");
const List = require("../models/List");

const createList = async (req, res) => {

    try{
        const { boardId } = req.params;

        const { title } = req.body;

        const board = req.board;

        const totalLists = await List.countDocuments({
            board: req.board._id
        });

        const list = await List.create({
            title,
            board: req.board._id,
            position: totalLists
        });

        res.status(201).json({
            message: "List created successfully",
            list
        });


    } catch (error){
        res.status(500).json({
            message: error.message
        });
    }

};

const getLists = async (req, res) => {
    
    try{
        const { boardId } = req.params;

        const lists = await List.find({
            board: boardId
        })
        .sort({
            position: 1
        })

        res.status(200).json({
            lists
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }

};

const updateList = async (req, res) => {

    try {
        const { listId } = req.params;

        const list = await List.findOne({
            _id: listId,
            board: req.board._id
        });

        if(!list){
            return res.status(404).json({
                message: "List not found"
            });
        }

        const { title } = req.body;

        if(title !== undefined){
            list.title = title;
        }

        await list.save();

        res.status(200).json({
            message: "List updated successfully",
            list
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }

};

const deleteList = async (req, res) => {

    try {
        const { listId } = req.params;

        const list = await List.findOne({
            _id: listId,
            board: req.board._id
        });

        if(!list){
            return res.status(404).json({
                message: "List not found"
            });
        }

        await list.deleteOne();

        res.status(200).json({
            message: "List deleted successfully"
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }

};

const moveList = async (req, res) => {

    try{
        const { listId } = req.params;

        const { newPosition } = req.body;

        const lists = await List.find({
            board: req.board._id
        }).sort({
            position:1
        });


        const currentIndex = lists.findIndex(
            list => list._id.toString() === listId
        );


        if(currentIndex === -1){
            return res.status(404).json({
                message:"List not found"
            });
        }

        const [movedList] = lists.splice(currentIndex,1);

        lists.splice(newPosition,0,movedList);

        for(let i = 0; i < lists.length; i++){
            lists[i].position=i;
            await lists[i].save();
        }

        res.status(200).json({
            message:"List reordered successfully"
        });

    } catch (error) {
        res.status(500).json({
            message:error.message
        });
    }

};

module.exports = { createList, getLists, updateList, deleteList, moveList };