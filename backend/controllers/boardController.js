const Board = require("../models/Board");
const Workspace = require("../models/Workspace");

const createBoard = async (req, res, next) => {

    try{
        const { workspaceId } = req.params;

        const { name, description } = req.body;

        const board = await Board.create({
            name,
            description,
            workspace: workspaceId
        });

        res.status(201).json({
            message: "Board created successfully",
            board
        });

    } catch (error){
        res.status(500).json({
            message: error.message
        });

    }
};

const getBoards = async (req, res) => {

    try{
        const { workspaceId } = req.params;
        
        const boards = await Board.find({
            workspace: workspaceId
        }).populate("workspace", "name description");

        res.status(200).json({
            boards
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};


const updateBoard = async (req, res, next) => {

    try{
        const { boardId } = req.params;
        
        const board = await Board.findOne({
            _id: boardId,
            workspace: req.workspace._id
        });

        if(!board){
            return res.status(404).json({
                message:"Board not found"
            });
        }

        const { name, description} = req.body;

        if(name !== undefined){
            board.name = name;
        }

        if(description !== undefined){
            board.description = description;
        }

        await board.save();

        res.status(200).json({
            message:"Board updated successfully",
            board
        });

    } catch (error) {
        res.status(500).json({
            message:error.message
        });
    }
}

const deleteBoard = async (req, res) => {

    try{
        const { boardId } = req.params;

        const board = await Board.findOne({
            _id: boardId,
            workspace: req.workspace._id
        });

        if(!board){
            return res.status(404).json({
                message:"Board not found"
            });
        }

        await board.deleteOne();

        res.status(200).json({
            message:"Board deleted successfully"
        });

    } catch (error) {
        res.status(500).json({
            message:error.message
        });
    }

};

module.exports = { createBoard, getBoards, updateBoard, deleteBoard };