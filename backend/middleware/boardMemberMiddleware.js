const Board = require("../models/Board");
const Workspace = require("../models/Workspace");

const boardMemberMiddleware = async (req, res, next) => {

    try{
        const { boardId } = req.params;

        const board = await Board.findById(boardId);

        if(!board){
            return res.status(404).json({
                message: "Board not found"
            });
        }

        const workspace = await Workspace.findById(board.workspace);

        if(!workspace){
            return res.status(404).json({
                message: "Workspace not found"
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

        req.board = board;
        req.workspace = workspace;

        next();

    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }

};

module.exports = boardMemberMiddleware;