const Card = require("../models/Card");
const List = require("../models/List");
const Board = require("../models/Board");
const Workspace = require("../models/Workspace");

const cardMemberMiddleware = async (req, res, next) => {
    try {
        const { cardId } = req.params;

        // Find the card
        const card = await Card.findById(cardId);

        if (!card) {
            return res.status(404).json({
                message: "Card not found"
            });
        }

        // Find the list containing the card
        const list = await List.findById(card.list);

        if (!list) {
            return res.status(404).json({
                message: "List not found"
            });
        }

        // Find the board containing the list
        const board = await Board.findById(list.board);

        if (!board) {
            return res.status(404).json({
                message: "Board not found"
            });
        }

        // Find the workspace containing the board
        const workspace = await Workspace.findById(board.workspace);

        if (!workspace) {
            return res.status(404).json({
                message: "Workspace not found"
            });
        }

        // Check whether the logged-in user belongs to the workspace
        const isMember = workspace.members.some(
            (memberId) => memberId.toString() === req.user.userId
        );

        if (!isMember) {
            return res.status(403).json({
                message: "Access forbidden. You are not a member of this workspace"
            });
        }

        // Make the loaded resources available to controllers
        req.card = card;
        req.list = list;
        req.board = board;
        req.workspace = workspace;

        next();

    } catch (error) {
        console.error("Card member middleware error:", error);

        return res.status(500).json({
            message: "Server error while checking card access"
        });
    }
};

module.exports = cardMemberMiddleware;