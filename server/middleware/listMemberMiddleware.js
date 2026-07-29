const Board = require("../models/Board");
const List = require("../models/List");
const Workspace = require("../models/Workspace");

const listMemberMiddleware = async (req, res, next) => {

    try{

        const { listId } = req.params;

        const list = await List.findById(listId);

        if(!list){
            return res.status(404).json({
                message:"List not found"
            });
        }

        const board = await Board.findById(list.board);

        if(!board){
            return res.status(404).json({
                message:"Board not found"
            });
        }

        const workspace = await Workspace.findById(board.workspace);

        if(!workspace){
            return res.status(404).json({
                message:"Workspace not found"
            });
        }

        const isMember = workspace.members.some(
            member => member.toString() === req.user.userId
        );

        if(!isMember){
            return res.status(403).json({
                message: "Access denied."
            });
        }

        req.list = list;
        req.board = board;
        req.workspace = workspace;

        next();

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }

};

module.exports = listMemberMiddleware;